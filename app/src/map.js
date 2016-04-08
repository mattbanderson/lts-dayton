var map = L.map('mapid').setView([39.76, -84.18], 13);

addOsmTileLayer();
addGeoJsonVtLayer();

function addGeoJsonVtLayer() {
  addGeoJsonVtToMap('data/NetworkLTS4.no-desc.json', 'red');
  addGeoJsonVtToMap('data/NetworkLTS3.no-desc.json', 'yellow');
  addGeoJsonVtToMap('data/LowStressStreets.no-desc.json', 'blue');
}

function addTopoJsonLayer() {
  addTopoJsonToMap('data/NetworkLTS4.topo.json', "#FF0000");
  addTopoJsonToMap('data/NetworkLTS3.topo.json', "#FFFF00");
  addTopoJsonToMap('data/LowStressStreets.topo.json', "#008000");
}

function addGeoJsonLayer() {
  addGeoJsonToMap('data/NetworkLTS4.no-desc.json', "#FF0000 ");
  addGeoJsonToMap('data/NetworkLTS3.no-desc.json', "#FFFF00");
  addGeoJsonToMap('data/LowStressStreets.no-desc.json', "#008000");
}

function addGeoJsonVtToMap(url, lineColor) {
  $.get(url, function(data) {
    var tileIndex = geojsonvt(data, { maxZoom: 18 });

    var canvasTiles = L.tileLayer.canvas();
    canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
      var tile = tileIndex.getTile(zoom, tilePoint.x, tilePoint.y);

      if (!tile) {
        return;
      }

      drawFeatures(canvas.getContext('2d'), tile.features, lineColor);
    };
    canvasTiles.addTo(map);
  });
}

function drawFeatures(ctx, features, lineColor) {
  ctx.strokeStyle = lineColor
  for (var i = 0; i < features.length; i++) {
    var feature = features[i],
        type = feature.type;
    ctx.fillStyle = feature.tags.color ? feature.tags.color : 'rgba(255,0,0,0.05)';
    ctx.beginPath();
    for (var j = 0; j < feature.geometry.length; j++) {
        const pad = 5;
        var geom = feature.geometry[j];
        if (type === 1) {
            ctx.arc(geom[0] * ratio + pad, geom[1] * ratio + pad, 2, 0, 2 * Math.PI, false);
            continue;
        }
        for (var k = 0; k < geom.length; k++) {
            var p = geom[k];
            var extent = 4096;

            var x = p[0] / extent * 256;
            var y = p[1] / extent * 256;
            if (k) ctx.lineTo(x  + pad, y   + pad);
            else ctx.moveTo(x  + pad, y  + pad);
        }
    }
    if (type === 3 || type === 1) ctx.fill('evenodd');
    ctx.stroke();
  }
}

function addMapboxTileLayer() {
  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox.mapbox-streets-v7',
      accessToken: 'pk.eyJ1IjoibWJhbmRlcnNvbjMiLCJhIjoiY2lscmNwbm91MDhxN3VobTFneGhscXdrOSJ9.v6i-0EYa3CW7icfo0a_Chw'
  }).addTo(mymap);
}

function addOsmTileLayer() {
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

function addGeoJsonToMap(url, color) {
  $.get(url, function(data) {
    L.geoJson(data, {
      style: {
        color: color,
        weight: 3
      }
    }).addTo(map);
  });
}

function addTopoJsonToMap(url, color) {
  var layer = L.geoJson(null, {
      style: function(feature) {
          return {
            color: color,
            weight: 3
          };
      }
  });
  omnivore.topojson(url, null, layer).addTo(map);
}
