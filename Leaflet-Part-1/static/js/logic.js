// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson";


//  Define a map object
let myMap = L.map("map", {
  center: [39.8283, -98.5795],
  zoom: 3,
  // layers : [street, topo]
});

// Create the base layers.
let street =  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

let baseMaps = {
  "Steet" : street,
  "Topographic" : topo
}


d3.json(queryUrl).then(function(data) {
  L.geoJSON(data).addTo(myMap);
  let response = data.features
  var marker = [];

  for (let i = 0; i < response.length; i++) {
    let coords = response[i].geometry
    if (coords) {
    marker.push(
      ([coords.coordinates[1], coords.coordinates[0]]));
    }
  }
  L.circle(marker, {
    stroke : false,
    fillOpacity: 0.75,
    color: "red",
    fillColor: "red",
    radius : 10000000
  }).bindPopup(`<h1>${features.properites.place}</h1>`).addTo(myMap)
  })