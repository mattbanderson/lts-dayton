var map = L.map('mapid').setView([39.76, -84.18], 13);

addOsmTileLayer();
addGeoJsonToMap();

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

function addGeoJsonToMap() {
  $.get('/data/NetworkLTS4.no-desc.json', function(data) {
    var myStyle = {
      "color": "#ff7800",
      "weight": 5,
      "opacity": 0.65
    };
    L.geoJson(data, { style: myStyle }).addTo(map);
  });
}

function addTopoJsonToMap() {
  $.get('/data/NetworkLTS4.topo.json', function(data) {
    omnivore.topojson.parse(data).addTo(map);
  });
}
