var demo = Cesium.defaultValue(demo, false);

const fileOptions = {
    dataDirectory: '../data/',
    dataFile: "demo.nc",
    glslDirectory: demo ? '../Cesium-3D-Wind/glsl/' : 'glsl/'
}

const defaultParticleSystemOptions = {
    maxParticles: 64 * 64,
    particleHeight: 100.0,
    fadeOpacity: 0.996,
    dropRate: 0.003,
    dropRateBump: 0.01,
    speedFactor: 1.0,
    lineWidth: 4.0
}

const globeLayers = [
    { name: "NaturalEarthII", type: "NaturalEarthII" },
    { name: "WMS:Air Pressure", type: "WMS", layer: "Pressure_surface", ColorScaleRange: '51640,103500' },
    { name: "WMS:Wind Speed", type: "WMS", layer: "Wind_speed_gust_surface", ColorScaleRange: '0.1095,35.31' },
    { name: "WorldTerrain", type: "WorldTerrain" }
]

const defaultLayerOptions = {
    "globeLayer": globeLayers[0],
    "WMS_URL": "https://www.ncei.noaa.gov/thredds/wms/model-gfs-g4-anl-files-old/201809/20180916/gfsanl_4_20180916_0000_000.grb2",
}

class Panel {
    constructor() {
        this.maxParticles = defaultParticleSystemOptions.maxParticles;
        this.particleHeight = defaultParticleSystemOptions.particleHeight;
        this.fadeOpacity = defaultParticleSystemOptions.fadeOpacity;
        this.dropRate = defaultParticleSystemOptions.dropRate;
        this.dropRateBump = defaultParticleSystemOptions.dropRateBump;
        this.speedFactor = defaultParticleSystemOptions.speedFactor;
        this.lineWidth = defaultParticleSystemOptions.lineWidth;

        this.globeLayer = defaultLayerOptions.globeLayer;
        this.WMS_URL = defaultLayerOptions.WMS_URL;

        var layerNames = [];
        globeLayers.forEach(function (layer) {
            layerNames.push(layer.name);
        });
        this.layerToShow = layerNames[0];

        var onParticleSystemOptionsChange = function () {
            var event = new CustomEvent('particleSystemOptionsChanged');
            window.dispatchEvent(event);
        }

        const that = this;
        var onLayerOptionsChange = function () {
            for (var i = 0; i < globeLayers.length; i++) {
                if (that.layerToShow == globeLayers[i].name) {
                    that.globeLayer = globeLayers[i];
                    break;
                }
            }
            var event = new CustomEvent('layerOptionsChanged');
            window.dispatchEvent(event);
        }

        window.onload = function () {
            var gui = new dat.GUI({ autoPlace: false });
            gui.add(that, 'maxParticles', 1, 256 * 256, 1).onFinishChange(onParticleSystemOptionsChange);
            gui.add(that, 'particleHeight', 1, 10000, 1).onFinishChange(onParticleSystemOptionsChange);
            gui.add(that, 'fadeOpacity', 0.90, 0.999, 0.001).onFinishChange(onParticleSystemOptionsChange);
            gui.add(that, 'dropRate', 0.0, 0.1).onFinishChange(onParticleSystemOptionsChange);
            gui.add(that, 'dropRateBump', 0, 0.2).onFinishChange(onParticleSystemOptionsChange);
            gui.add(that, 'speedFactor', 0.05, 8).onFinishChange(onParticleSystemOptionsChange);
            gui.add(that, 'lineWidth', 0.01, 16.0).onFinishChange(onParticleSystemOptionsChange);

            gui.add(that, 'layerToShow', layerNames).onFinishChange(onLayerOptionsChange);

            var panelContainer = document.getElementsByClassName('cesium-widget').item(0);
            gui.domElement.classList.add('myPanel');
            panelContainer.appendChild(gui.domElement);
        };
    }

    getUserInput() {
        // make sure maxParticles is exactly the square of particlesTextureSize
        var particlesTextureSize = Math.ceil(Math.sqrt(this.maxParticles));
        this.maxParticles = particlesTextureSize * particlesTextureSize;

        return {
            particlesTextureSize: particlesTextureSize,
            maxParticles: this.maxParticles,
            particleHeight: this.particleHeight,
            fadeOpacity: this.fadeOpacity,
            dropRate: this.dropRate,
            dropRateBump: this.dropRateBump,
            speedFactor: this.speedFactor,
            lineWidth: this.lineWidth,
            globeLayer: this.globeLayer,
            WMS_URL: this.WMS_URL
        }
    }
}
