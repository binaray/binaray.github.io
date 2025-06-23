var DataProcess = (function () {
    var data;
	
	var loadJson = function (filePath) {
        return new Promise(function (resolve) {
			fetch(filePath)
				.then((res) => res.json())
				.then((json) => {
					window.json = json;
					// surface currents data scheme: 
					// nx: Longitude Point Count, ny: Latitude Point Count, minMag: minMagnitude, maxMag: maxMagnitude
					// data: [[lon, lat, velocity.x, velocity.y, magnitude],...]
					data = {};

					data.dimensions = {};
					data.dimensions.lon = json.nx;
					data.dimensions.lat = json.ny;
					data.dimensions.lev = 1;

					data.lon = {};
					data.lon.array = new Float32Array(json.data.length);
					data.lon.min = .5;
					data.lon.max = .5;

					data.lat = {};
					data.lat.array = new Float32Array(json.data.length);
					data.lat.min = .5;
					data.lat.max = .5;

					data.lev = {};
					data.lev.array = new Float32Array([1]);
					data.lev.min = 1;
					data.lev.max = 1;

					data.U = {};
					data.U.array = new Float32Array(json.data.length);
					data.U.min = .5;
					data.U.max = .5;

					data.V = {};
					data.V.array = new Float32Array(json.data.length);
					data.V.min = .5;
					data.V.max = .5;
					
					for (let i = 0; i < json.data.length; i++){
						const pt = json.data[i];
						//if (pt[0] < 0) pt[0] = 360 + pt[0];
						pt[0] = 180 + pt[0];
						data.lon.array[i] = pt[0];
						data.lat.array[i] = pt[1];
						data.U.array[i] = pt[2];
						data.V.array[i] = pt[3];
						if (pt[0] < data.lon.min) data.lon.min = pt[0];
						if (pt[0] > data.lon.max) data.lon.max = pt[0];
						if (pt[1] < data.lat.min) data.lat.min = pt[1];
						if (pt[1] > data.lat.max) data.lat.max = pt[1];
						if (pt[2] < data.U.min) data.U.min = pt[2];
						if (pt[2] > data.U.max) data.U.max = pt[2];
						if (pt[3] < data.V.min) data.V.min = pt[3];
						if (pt[3] > data.V.max) data.V.max = pt[3];
					}
					resolve(data);
			})
			.catch((e) => console.error(e));
        });
    }
	
	var loadMsgPack = function (filePath) {
        return new Promise(function (resolve) {
            var request = new XMLHttpRequest();
            request.open('GET', filePath);
            request.responseType = 'arraybuffer';

            request.onload = function () {
				var d = msgpack.deserialize(request.response);
				
                res = {};
                res.dimensions = {};
                res.dimensions.lon = d.lon.array.length;
                res.dimensions.lat = d.lat.array.length;
                res.dimensions.lev = d.lev.array.length;

                d.lon.array = new Float32Array(d.lon.array);
                d.lat.array = new Float32Array(d.lat.array);
                d.lev.array = new Float32Array(d.lev.array);
                d.U.array = new Float32Array(d.U.array.flat());
                d.V.array = new Float32Array(d.V.array.flat());
				
                res.lon = d.lon;
                res.lat = d.lat;
                res.lev = d.lev;
                res.U = d.U;
                res.V = d.V;
				
				data = res;
                resolve(data);
            };

            request.send();
        });
    }

    var loadNetCDF = function (filePath) {
        return new Promise(function (resolve) {
            var request = new XMLHttpRequest();
            request.open('GET', filePath);
            request.responseType = 'arraybuffer';

            request.onload = function () {
                var arrayToMap = function (array) {
                    return array.reduce(function (map, object) {
                        map[object.name] = object;
                        return map;
                    }, {});
                }

                var NetCDF = new netcdfjs(request.response);
                data = {};

                var dimensions = arrayToMap(NetCDF.dimensions);
                data.dimensions = {};
                data.dimensions.lon = dimensions['lon'].size;
                data.dimensions.lat = dimensions['lat'].size;
                data.dimensions.lev = dimensions['lev'].size;

                var variables = arrayToMap(NetCDF.variables);
                var uAttributes = arrayToMap(variables['U'].attributes);
                var vAttributes = arrayToMap(variables['V'].attributes);

                data.lon = {};
                data.lon.array = new Float32Array(NetCDF.getDataVariable('lon').flat());
                data.lon.min = Math.min(...data.lon.array);
                data.lon.max = Math.max(...data.lon.array);

                data.lat = {};
                data.lat.array = new Float32Array(NetCDF.getDataVariable('lat').flat());
                data.lat.min = Math.min(...data.lat.array);
                data.lat.max = Math.max(...data.lat.array);

                data.lev = {};
                data.lev.array = new Float32Array(NetCDF.getDataVariable('lev').flat());
                data.lev.min = Math.min(...data.lev.array);
                data.lev.max = Math.max(...data.lev.array);

                data.U = {};
                data.U.array = new Float32Array(NetCDF.getDataVariable('U').flat());
                data.U.min = uAttributes['min'].value;
                data.U.max = uAttributes['max'].value;

                data.V = {};
                data.V.array = new Float32Array(NetCDF.getDataVariable('V').flat());
                data.V.min = vAttributes['min'].value;
                data.V.max = vAttributes['max'].value;
				
                resolve(data);
            };

            request.send();
        });
    }

    var loadData = async function () {
        // var ncFilePath = fileOptions.dataDirectory + fileOptions.dataFile;
        // await loadNetCDF(ncFilePath);
        // await loadJson(fileOptions.dataDirectory + 'oceanVel_0103_past1000_res250km_depth5m_1750-01-16.json');
		await loadMsgPack(fileOptions.dataDirectory + 'wind_184912.bin');
		window.data = data;
        return data;
    }

    var randomizeParticles = function (maxParticles, viewerParameters) {
        var array = new Float32Array(4 * maxParticles);
        for (var i = 0; i < maxParticles; i++) {
            array[4 * i] = Cesium.Math.randomBetween(viewerParameters.lonRange.x, viewerParameters.lonRange.y);
            array[4 * i + 1] = Cesium.Math.randomBetween(viewerParameters.latRange.x, viewerParameters.latRange.y);
            array[4 * i + 2] = Cesium.Math.randomBetween(data.lev.min, data.lev.max);
            array[4 * i + 3] = 0.0;
        }
        return array;
    }

    return {
        loadData: loadData,
        randomizeParticles: randomizeParticles
    };

})();