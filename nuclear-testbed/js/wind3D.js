class Wind3D {
    constructor(panel, mode) {
        var options = {
            // use Sentinel-2 instead of the default Bing Maps because Bing Maps sessions is limited
            imageryProvider: new Cesium.IonImageryProvider({ assetId: 3954 }),
			vrButton: true,
			animation: false,
			timeline: false,
            // useBrowserRecommendedResolution can be set to false to improve the render quality
            // useBrowserRecommendedResolution: false,
            scene3DOnly: true
        }

        if (mode.debug) {
            options.useDefaultRenderLoop = false;
        }

        this.viewer = new Cesium.Viewer('cesiumContainer', options);
        this.scene = this.viewer.scene;
        this.camera = this.viewer.camera;

        this.panel = panel;

        this.viewerParameters = {
            lonRange: new Cesium.Cartesian2(),
            latRange: new Cesium.Cartesian2(),
            pixelSize: 0.0
        };
        // use a smaller earth radius to make sure distance to camera > 0
        this.globeBoundingSphere = new Cesium.BoundingSphere(Cesium.Cartesian3.ZERO, 0.99 * 6378137.0);
        this.updateViewerParameters();
		
		
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
		this.viewer.scene.screenSpaceCameraController.inertiaSpin = 0;
		this.viewer.scene.screenSpaceCameraController.inertiaTranslate = 0;
		this.viewer.scene.screenSpaceCameraController.inertiaZoom = 0;
		
		this.addLocationClusters();

        DataProcess.loadData().then(
            (data) => {
				let userInput = this.panel.getUserInput();
                this.particleSystem = new ParticleSystem(this.scene.context, data,
                    userInput, this.viewerParameters);
                if (userInput.showCurrents) this.addPrimitives();
				this.particleSystemActive = userInput.showCurrents;

                this.setupEventListeners();

                if (mode.debug) {
                    this.debug();
                }
            });

        this.imageryLayers = this.viewer.imageryLayers;
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

		fetch(fileOptions.dataDirectory +"Maritime Museums (Oct 2024).csv")
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
	
    addPrimitives(isShown) {
		if (!this.systemPrimitives)
		{
			this.systemPrimitives = new Cesium.PrimitiveCollection();
			this.scene.primitives.add(this.systemPrimitives);
		}
		if (isShown){
			this.systemPrimitives.add(this.particleSystem.particlesComputing.primitives.calculateSpeed);
			this.systemPrimitives.add(this.particleSystem.particlesComputing.primitives.updatePosition);
			this.systemPrimitives.add(this.particleSystem.particlesComputing.primitives.postProcessingPosition);
			this.systemPrimitives.add(this.particleSystem.particlesRendering.primitives.segments);
			this.systemPrimitives.add(this.particleSystem.particlesRendering.primitives.trails);
			this.systemPrimitives.add(this.particleSystem.particlesRendering.primitives.screen);
		}
        // the order of primitives.add() should respect the dependency of primitives
        // this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.calculateSpeed);
        // this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.updatePosition);
        // this.scene.primitives.add(this.particleSystem.particlesComputing.primitives.postProcessingPosition);

        // this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.segments);
        // this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.trails);
        // this.scene.primitives.add(this.particleSystem.particlesRendering.primitives.screen);
    }
	
	showPrimitives(isShown) {
		if (this.systemPrimitives) {
			this.systemPrimitives.show = isShown;
			if (!isShown) this.systemPrimitives.removeAll();	
		}
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

    setupEventListeners() {
        const that = this;

        this.camera.moveStart.addEventListener(function () {
			let userInput = that.panel.getUserInput();
            if (!userInput.showCurrents) return;
			that.systemPrimitives.show = false;
        });

        this.camera.moveEnd.addEventListener(function () {
			let userInput = that.panel.getUserInput();
            if (!userInput.showCurrents) return;
			
            that.updateViewerParameters();
            that.particleSystem.applyViewerParameters(that.viewerParameters);
            that.systemPrimitives.show = true;
        });

        var resized = false;
        window.addEventListener("resize", function () {
			let userInput = that.panel.getUserInput();
			if (!userInput.showCurrents) return;
            resized = true;
            that.systemPrimitives.show = false;
            that.systemPrimitives.removeAll();
        });

        this.scene.preRender.addEventListener(function () {
			let userInput = that.panel.getUserInput();
            if (resized && userInput.showCurrents) {
                that.particleSystem.canvasResize(that.scene.context);
                resized = false;
                that.addPrimitives(true);
                that.systemPrimitives.show = true;
            }
        });
		
        window.addEventListener('particleSystemOptionsChanged', function () {
			let userInput = that.panel.getUserInput();
			that.showPrimitives(userInput.showCurrents);
            that.particleSystem.applyUserInput(userInput);
			that.addPrimitives(userInput.showCurrents);
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
