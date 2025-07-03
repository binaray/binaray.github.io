var demo = Cesium.defaultValue(demo, false);

const fileOptions = {
    dataDirectory: 'data/',
    glslDirectory: 'js/glsl/'
}

const dataFiles = {
	Winds: "wind_184912.bin",
	Ocean: "ocean_1650.bin"
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

class Panel {
    constructor() {
		var gui = null;
		
		this.showCurrents = false;
		var currentOptions = ["Winds", "Ocean"];
		this.currentType = currentOptions[0];
		
        this.maxParticles = defaultParticleSystemOptions.maxParticles;
        this.particleHeight = defaultParticleSystemOptions.particleHeight;
        this.fadeOpacity = defaultParticleSystemOptions.fadeOpacity;
        this.dropRate = defaultParticleSystemOptions.dropRate;
        this.dropRateBump = defaultParticleSystemOptions.dropRateBump;
        this.speedFactor = defaultParticleSystemOptions.speedFactor;
        this.lineWidth = defaultParticleSystemOptions.lineWidth;

        var onParticleSystemOptionsChange = function () {
            var event = new CustomEvent('particleSystemOptionsChanged');
            window.dispatchEvent(event);
        }

        const that = this;

        window.onload = function () {
            that.gui = new dat.GUI({ autoPlace: false });
            that.gui.add(that, 'maxParticles', 1, 256 * 256, 1).onFinishChange(onParticleSystemOptionsChange);
            // gui.add(that, 'particleHeight', 1, 10000, 1).onFinishChange(onParticleSystemOptionsChange);
            // gui.add(that, 'fadeOpacity', 0.90, 0.999, 0.001).onFinishChange(onParticleSystemOptionsChange);
            // gui.add(that, 'dropRate', 0.0, 0.1).onFinishChange(onParticleSystemOptionsChange);
            // gui.add(that, 'dropRateBump', 0, 0.2).onFinishChange(onParticleSystemOptionsChange);
            that.gui.add(that, 'speedFactor', 0.05, 8).onFinishChange(onParticleSystemOptionsChange);
            // gui.add(that, 'lineWidth', 0.01, 16.0).onFinishChange(onParticleSystemOptionsChange);

            // gui.add(that, 'layerToShow', layerNames).onFinishChange(onLayerOptionsChange);
			that.gui.add(that, 'showCurrents').onFinishChange(onParticleSystemOptionsChange);
			that.gui.add(that, 'currentType', currentOptions).onFinishChange(onParticleSystemOptionsChange);
			
            var panelContainer = document.getElementsByClassName('cesium-widget').item(0);
            that.gui.domElement.classList.add('myPanel');
            panelContainer.appendChild(that.gui.domElement);
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
            WMS_URL: this.WMS_URL,
			showCurrents: this.showCurrents,
			dataFile: dataFiles[this.currentType]
        }
    }
}
