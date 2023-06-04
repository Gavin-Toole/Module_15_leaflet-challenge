// Store our API endpoint as queryUrl.
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});
 {

  //  Create a fuction for maker size
function markerSize(depth) {
  return depth * 9000
  }

  // Function to determine marker color by depth
function markerColor(depth){ 
  if (depth < 10) return "red";
  else if (depth < 30) return "orange";
  else if (depth < 50) return "yellow";
  else if (depth < 70) return "green";
  else if (depth < 90) return "blue";
  else return "purple";
}
function createFeatures(earthquakeData) {


  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><h1>Magnitude: ${feature.properties.mag}</h1><hr><h1>Depth: ${feature.geometry.coordinates[2]}</h1`);
  }

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
  

    // Point to layer used to alter markers
    pointToLayer: function(feature, latlng) {

      // Determine the style of markers based on properties
      var markers = {
        radius: markerSize(feature.properties.mag),
        fillColor: markerColor(feature.geometry.coordinates[2]),
        color : markerColor(feature.geometry.coordinates[2]),
        fillOpacity: 0.7,
        stroke: true,
        weight: 0.5
      }
      return L.circle(latlng, markers);
     }
    });

      // Create map legend to provide context for map data
      var legend = L.control({position: 'bottomleft'});

      legend.onAdd = function() {
          let div = L.DomUtil.create('div', 'info legend');
          depth = [-10, 10, 30, 50, 70, 90];
          labels = []
          let legendInfo = "<h4>Magnitude</h4>";

          div.innerHTML = legendInfo

          // go through each magnitude item to label and color the legend
          // push to labels array as list item
          for (var i = 0; i < depth.length; i++) {
                labels.push('<ul style="background-color:' + markerColor(depth[i] + 1) + '"> <span>' + depth[i] + (depth[i + 1] ? '&ndash;' + depth[i + 1] + '' : '+') + '</span></ul>');
              }

            // add each label list item to the div under the <ul> tag
            div.innerHTML += "<ul>" + labels.join("") + "</ul>";
          
          return div;
        };

    // Send our earthquakes layer to the createMap function/
    createMap(earthquakes);
  

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [37.09, -95.71],
    zoom: 5,
    layers: [topo, earthquakes]
  });
    legend.addTo(myMap);

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);
    }
  }
};
