class GlobeVis {
    constructor(panel, mode) {
		Cesium.Ion.defaultAccessToken = undefined; // Ensure Ion is disabled
        var options = {
			terrainProvider: new Cesium.EllipsoidTerrainProvider(), // Spherical globe with no terrain
			vrButton: true,
			animation: false,
			timeline: false,
            // geocoder: false,
            // infoBox: false,
            // fullscreenElement: 'cesiumContainer',
            // useBrowserRecommendedResolution can be set to false to improve the render quality
            // useBrowserRecommendedResolution: false,
            scene3DOnly: true
        }

        if (mode.debug) options.useDefaultRenderLoop = false;

        this.viewer = new Cesium.Viewer('cesiumContainer', options);
        this.scene = this.viewer.scene;
        this.camera = this.viewer.camera;

        //this.panel = panel;

        this.viewerParameters = {
            lonRange: new Cesium.Cartesian2(),
            latRange: new Cesium.Cartesian2(),
            pixelSize: 0.0
        };
        // use a smaller earth radius to make sure distance to camera > 0
        this.globeBoundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, 0.99 * 6378137.0);
        this.updateViewerParameters();
		/*
        DataProcess.loadData().then(
            (data) => {
                this.particleSystem = new ParticleSystem(this.scene.context, data,
                    this.panel.getUserInput(), this.viewerParameters);
                this.addPrimitives();

                this.setupEventListeners();

                if (mode.debug) {
                    this.debug();
                }
            });
		*/
        // this.imageryLayers = this.viewer.imageryLayers;
        // this.setGlobeLayer(this.panel.getUserInput());
		
		// Remove Cesium Ion dependencies from selectable base maps
		this.viewer.baseLayerPicker.viewModel.terrainProviderViewModels = [];
		let basemapOptions = this.viewer.baseLayerPicker.viewModel.imageryProviderViewModels;
		for (let i = basemapOptions.length - 1; i > -1; i--){
			if (basemapOptions[i]._category == 'Cesium ion')
				basemapOptions.splice(i,1)
			else basemapOptions[i]._category = ''
		}
		
		this.viewer.baseLayerPicker.viewModel.selectedImagery = basemapOptions[0];
		
		// Remove Cesium Ion credits- https://community.cesium.com/t/cesium-ion-logo-removal/8979
		this.viewer._cesiumWidget._creditContainer.parentNode.removeChild(this.viewer._cesiumWidget._creditContainer);
		
		// Setup camera options
		this.viewer.scene.screenSpaceCameraController.enableLook = false;
		this.viewer.scene.screenSpaceCameraController.enableTilt = false;
		this.viewer.scene.screenSpaceCameraController.inertiaSpin   = 0;
		this.viewer.scene.screenSpaceCameraController.inertiaTranslate    = 0;
		this.viewer.scene.screenSpaceCameraController.inertiaZoom    = 0;
		
		this.addLocationClusters();
    }
	
	addLocationClusters() {
		// Cluster Geopoints- https://sandcastle.cesium.com/index.html?src=Clustering.html
		// shared cluster instance between all collections
		const entitiesCluster = new Cesium.EntityCluster({
			enabled: true,
			pixelRange: 50,
		});
		entitiesCluster.clusterEvent.addEventListener(
			function (clusteredEntities, cluster) {
				  cluster.label.show = true;
				  cluster.label.text = `${clusteredEntities.length}`;
				  cluster.label.font = `15px sans-serif`;
				  cluster.label.horizontalOrigin = Cesium.HorizontalOrigin.CENTER;
				  cluster.label.verticalOrigin = Cesium.VerticalOrigin.CENTER;
				  cluster.label.eyeOffset = new Cesium.Cartesian3(0, 0, -100),
				  cluster.point.show = true;
				  cluster.point.color  = new Cesium.Color(0.92, 0.58, 0.1, 1);
				  cluster.point.pixelSize = 30;
			},);
		
		const maritimeMuseums = new Cesium.CustomDataSource('MaritimeMuseums');
		maritimeMuseums.clustering = entitiesCluster;

		fetch("data/Maritime Museums (Oct 2024).csv")
			.then((res) => res.text())
			.then((text) => {
				let museums = $.csv.toObjects(text);
				for (const museum of museums){
					const latLon = museum.Coordinates.split(/\s*,\s*/);
					if (latLon.length < 2)	// skip invalid/extinct museums
						continue;
					const descrip = 
						`<div class="map-overlay-inner">
							${Object.entries(museum)
								.map(([key, value]) => `<li><b>${key}</b>: ${value}</li>`)
								.join('')}
						</div>`;
					maritimeMuseums.entities.add({
					  name: museum['Museum Name'],
					  description: descrip,
					  position: Cesium.Cartesian3.fromDegrees(latLon[1],latLon[0]),
					  point: {
						pixelSize: 10,
						color: Cesium.Color.RED
					  }
					});
				}
				this.viewer.dataSources.add(maritimeMuseums);
			}).catch((e) => console.error(e));		
	}

    addPrimitives() {
        // the order of primitives.add() should respect the dependency of primitives
        this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.calculateSpeed);
        this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.updatePosition);
        this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.postProcessingPosition);

        this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.segments);
        this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.trails);
        this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.screen);
    }

    updateViewerParameters() {
        var viewRectangle = this.camera.computeViewRectangle(this.scene.globe.ellipsoid);
        var lonLatRange = Util.viewRectangleToLonLatRange(viewRectangle);
        this.viewerParameters.lonRange.x = lonLatRange.lon.min;
        this.viewerParameters.lonRange.y = lonLatRange.lon.max;
        this.viewerParameters.latRange.x = lonLatRange.lat.min;
        this.viewerParameters.latRange.y = lonLatRange.lat.max;

        var pixelSize = this.camera.getPixelSize(
            this.globeBoundingSphere,
            this.scene.drawingBufferWidth,
            this.scene.drawingBufferHeight
        );

        if (pixelSize > 0) {
            this.viewerParameters.pixelSize = pixelSize;
        }
    }

    setGlobeLayer(userInput) {
        this.viewer.imageryLayers.removeAll();
        this.viewer.terrainProvider = new Cesium.EllipsoidTerrainProvider();

        var globeLayer = userInput.globeLayer;
        switch (globeLayer.type) {
            case "NaturalEarthII": {
                this.viewer.imageryLayers.add(
                    Cesium.ImageryLayer.fromProviderAsync(
                        Cesium.TileMapServiceImageryProvider.fromUrl(
                            Cesium.buildModuleUrl("Assets/Textures/NaturalEarthII"),
                        )
                    )
                );
                break;
            }
            case "WMS": {
                this.viewer.imageryLayers.addImageryProvider(new Cesium.WebMapServiceImageryProvider({
                    url: userInput.WMS_URL,
                    layers: globeLayer.layer,
                    parameters: {
                        ColorScaleRange: globeLayer.ColorScaleRange
                    }
                }));
                break;
            }
            case "WorldTerrain": {
                this.viewer.imageryLayers.add(
                    Cesium.ImageryLayer.fromProviderAsync(Cesium.IonImageryProvider.fromAssetId(3954))
                );
                this.viewer.scene.setTerrain(Cesium.Terrain.fromWorldTerrain());
                break;
            }
        }
    }

    setupEventListeners() {
        const that = this;

        this.camera.moveStart.addEventListener(function () {
            that.scene.primitives.show = false;
        });

        this.camera.moveEnd.addEventListener(function () {
            that.updateViewerParameters();
            that.particleSystem.applyViewerParameters(that.viewerParameters);
            that.scene.primitives.show = true;
        });

        var resized = false;
        window.addEventListener("resize", function () {
            resized = true;
            that.scene.primitives.show = false;
            that.scene.primitives.removeAll();
        });

        this.scene.preRender.addEventListener(function () {
            if (resized) {
                that.particleSystem.canvasResize(that.scene.context);
                resized = false;
                that.addPrimitives();
                that.scene.primitives.show = true;
            }
        });

        window.addEventListener('particleSystemOptionsChanged', function () {
            //that.particleSystem.applyUserInput(that.panel.getUserInput());
        });
        window.addEventListener('layerOptionsChanged', function () {
            //that.setGlobeLayer(that.panel.getUserInput());
        });
    }

    debug() {
        const that = this;

        var animate = function () {
            that.viewer.resize();
            that.viewer.render();
            requestAnimationFrame(animate);
        }

        var spector = new SPECTOR.Spector();
        spector.displayUI();
        spector.spyCanvases();

        animate();
    }
}