var map = L.map('mapid').setView([39.76, -84.18], 13),
    levelOneColor = '#1C7C54',
    levelOneKey = 'LowStressStreets',
    levelThreeColor = '#F0C808',
    levelThreeKey = 'NetworkLTS3',
    levelFourColor = '#DD5454',
    levelFourKey = 'NetworkLTS4',
    layers = {};

addMapboxTileLayer();
addLegend();
addTopoJsonToGeoJsonVtLayer();

function addTopoJsonToGeoJsonVtLayer() {
  addTopoJsonToGeoJsonVtToMap('data/NetworkLTS4.topo.json', levelFourColor, levelFourKey);
  addTopoJsonToGeoJsonVtToMap('data/NetworkLTS3.topo.json', levelThreeColor, levelThreeKey);
  addTopoJsonToGeoJsonVtToMap('data/LowStressStreets.topo.json', levelOneColor, levelOneKey);
}

function addGeoJsonVtLayer() {
  addGeoJsonVtToMap('data/NetworkLTS4.no-desc.less-prec.json', 'red');
  addGeoJsonVtToMap('data/NetworkLTS3.no-desc.less-prec.json', 'orange');
  addGeoJsonVtToMap('data/LowStressStreets.no-desc.less-prec.json', 'blue');
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

function addTopoJsonToGeoJsonVtToMap(url, lineColor, objectKey) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onload = function() {
      if (xhr.status === 200) {
        var data = JSON.parse(xhr.responseText);
        var geoJsonFeatColl = topojson.feature(data, data.objects[objectKey])

        var tileIndex = geojsonvt(geoJsonFeatColl, { maxZoom: 18 });

        var canvasTiles = L.tileLayer.canvas();
        canvasTiles.drawTile = function(canvas, tilePoint, zoom) {
          var tile = tileIndex.getTile(zoom, tilePoint.x, tilePoint.y);

          if (!tile) {
            return;
          }

          drawFeatures(canvas.getContext('2d'), tile.features, lineColor);
        };
        canvasTiles.addTo(map);
        layers[objectKey] = canvasTiles;
      }
      else {
          alert('Request failed.  Returned status of ' + xhr.status);
      }
  };
  xhr.send();
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
  ctx.strokeStyle = lineColor;
  ctx.lineWidth = 1;

  for (var i = 0; i < features.length; i++) {
    var feature = features[i],
        type = feature.type;
    ctx.fillStyle = feature.tags.color ? feature.tags.color : 'rgba(255,0,0,0.05)';
    ctx.beginPath();
    for (var j = 0; j < feature.geometry.length; j++) {
        const pad = 0;
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
  L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWJhbmRlcnNvbjMiLCJhIjoiY2lscmNwbm91MDhxN3VobTFneGhscXdrOSJ9.v6i-0EYa3CW7icfo0a_Chw', {
      attribution: '&copy; <a href="https://www.mapbox.com/about/maps/">MapBox</a> &copy; <a href="http://www.openstreetmap.org/about/">OpenStreetMap</a>',
      maxZoom: 18,
  }).addTo(map);
}

function addOsmTileLayer() {
  L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
}

function toggleLayer(checkbox) {
  console.log(checkbox.checked);
  if (checkbox.checked) {
    map.addLayer(layers[checkbox.id]);
  } else {
    map.removeLayer(layers[checkbox.id]);

  }
}

function addLegendLine(text, lineColor, idKey) {
  return (
    '<tr>' +
      '<td><input type="checkbox" id="' + idKey + '" onclick="toggleLayer(this)" checked /></td>' +
      '<td><hr style="display:inline-block; width: 50px;" color="' + lineColor + '" size="5" />' +
      '</td><td>' + text + '</td>' +
    '</tr>'
  );
}

function addLegend() {
  var legend = L.control({position: 'topright'});

  legend.onAdd = function (map) {
      var div = L.DomUtil.create('div', 'info legend');
      div.innerHTML =
      '<table>' +
      addLegendLine("Low Stress", levelOneColor, levelOneKey) +
      addLegendLine("Moderate Stress", levelThreeColor, levelThreeKey) +
      addLegendLine("High Stress", levelFourColor, levelFourKey) +
      '</table>' +
      '<a href="http://transweb.sjsu.edu/project/1005.html" target="_blank">About</a>'
      return div;
  };
  legend.addTo(map);
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
