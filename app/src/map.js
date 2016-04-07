var map = L.map('mapid').setView([39.76, -84.18], 13);

addOsmTileLayer();
addTopoJsonToMap('data/NetworkLTS4.topo.json', "#FF0000 ");
addTopoJsonToMap('data/NetworkLTS3.topo.json', "#FFFF00");
addTopoJsonToMap('data/LowStressStreets.topo.json', "#008000");

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

function addGeoJsonToMap(url, style) {
  $.get(url, function(data) {
    L.geoJson(data, { style: style }).addTo(map);
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
