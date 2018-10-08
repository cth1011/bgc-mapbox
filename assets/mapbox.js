mapboxgl.accessToken = 'pk.eyJ1IjoiY3RoMTAxMSIsImEiOiJjam1zeGxieXcwanVtM3dwOGM2MDYycHpsIn0.YprKfMh8soeZo9N3ooomhQ';
var afterMap = new mapboxgl.Map({
    container: 'after',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [121.059359,14.550999],
    zoom: 14
});
afterMap.on('load', function() {

  afterMap.addSource('jams', {
      "type": "geojson",
      "data": "https://cdn.rawgit.com/cth1011/mapbox/ea5ae720/jams_after_p1.geojson"
  });
  var geojson = afterMap.addSource('alerts', {
      "type": "geojson",
      "data": "https://rawgit.com/cth1011/mapbox/master/alerts_after.geojson"
  });

    afterMap.addLayer({
        "id": "jams-heat",
        "type": "heatmap",
        "source": "jams",
        "maxzoom": 16,
        "paint": {
          // increase weight as diameter breast height increases
            "heatmap-weight": {
                "property": "delay",
                "type": "exponential",
                "stops": [
                    [1, 0],
                    [1000, 1]
                ]
            },
          // increase intensity as zoom level increases
            "heatmap-intensity": {
                "stops": [
                    [9, 0],
                    [10, 1],
                    [15, 2]
                ]
            },
          // use sequential color palette to use exponentially as the weight increases
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(236,222,239,0)",
                0.5, "rgb(243, 92, 99)",
                1.0, "rgba(195, 33, 51, 0.8)"
            ],
            // increase radius as zoom increases
            "heatmap-radius": {
                "stops": [
                    [13, 5],
                    [15, 15]
                ]
            },
            // decrease opacity to transition into the circle layer
            "heatmap-opacity": {
                "default": 1,
                "stops": [
                    [19, 1],
                    [20, 1]
                ]
            },
        }
    }, 'waterway-label');

   afterMap.addLayer({
        "id": "alerts-marker",
        "type": "circle",
        "source": "alerts",
        "minzoom": 14,
        "paint": {
          // increase the radius of the circle as the zoom level and dbh value increases
            "circle-radius": {
                "property": "reliabilit",
                "type": "exponential",
                "stops": [
                    [{ zoom: 15, value: 1 }, 5],
                    [{ zoom: 15, value: 62 }, 10],
                    [{ zoom: 22, value: 1 }, 20],
                    [{ zoom: 22, value: 62 }, 50],
                ]
            },
            "circle-color": {
                "property": "reliabilit",
                "type": "exponential",
                "stops": [
                  [0, "rgba(236,222,239,0)"],
                  [3, "rgb(236,222,239)"],
                  [4, "rgb(208,209,230)"],
                  [5, "rgb(166,189,219)"],
                  [6, "rgb(103,169,207)"],
                  [7, "rgb(28,144,153)"],
                  [10, "rgb(1,108,89)"]
                ]
            },
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            "circle-opacity": {
                "stops": [
                    [14, 0],
                    [15, 1]
                ]
            }
        }

    }, 'waterway-label');

        filter: ['==',['number',['get', 'hour']],12]
});

var beforeMap = new mapboxgl.Map({
    container: 'before',
    style: 'mapbox://styles/mapbox/light-v9',
    center: [121.059359,14.550999],
    zoom: 14
});
beforeMap.on('load', function() {

  beforeMap.addSource('jams-before', {
      "type": "geojson",
      "data": "https://cdn.rawgit.com/cth1011/mapbox/ea5ae720/jams_before_p1.geojson"
  });
  var geojson = beforeMap.addSource('alerts-before', {
      "type": "geojson",
      "data": "https://cdn.rawgit.com/cth1011/mapbox/ea5ae720/alerts_before.geojson"
  });

    beforeMap.addLayer({
        "id": "jams-heat-before",
        "type": "heatmap",
        "source": "jams-before",
        "maxzoom": 16,
        "paint": {
          // increase weight as diameter breast height increases
            "heatmap-weight": {
                "property": "delay",
                "type": "exponential",
                "stops": [
                    [1, 0],
                    [1000, 1]
                ]
            },
          // increase intensity as zoom level increases
            "heatmap-intensity": {
                "stops": [
                    [9, 0],
                    [10, 1],
                    [15, 2]
                ]
            },
          // use sequential color palette to use exponentially as the weight increases
            "heatmap-color": [
                "interpolate",
                ["linear"],
                ["heatmap-density"],
                0, "rgba(236,222,239,0)",
                0.5, "rgb(243, 92, 99)",
                1.0, "rgba(195, 33, 51, 0.8)"
            ],
            // increase radius as zoom increases
            "heatmap-radius": {
                "stops": [
                    [13, 5],
                    [15, 15]
                ]
            },
            // decrease opacity to transition into the circle layer
            "heatmap-opacity": {
                "default": 1,
                "stops": [
                    [19, 1],
                    [20, 1]
                ]
            },
        }
    }, 'waterway-label');

   beforeMap.addLayer({
        "id": "alerts-marker-before",
        "type": "circle",
        "source": "alerts-before",
        "minzoom": 14,
        "paint": {
          // increase the radius of the circle as the zoom level and dbh value increases
            "circle-radius": {
                "property": "reliabilit",
                "type": "exponential",
                "stops": [
                    [{ zoom: 15, value: 1 }, 5],
                    [{ zoom: 15, value: 62 }, 10],
                    [{ zoom: 22, value: 1 }, 20],
                    [{ zoom: 22, value: 62 }, 50],
                ]
            },
            "circle-color": {
                "property": "reliabilit",
                "type": "exponential",
                "stops": [
                  [0, "rgba(236,222,239,0)"],
                  [3, "rgb(236,222,239)"],
                  [4, "rgb(208,209,230)"],
                  [5, "rgb(166,189,219)"],
                  [6, "rgb(103,169,207)"],
                  [7, "rgb(28,144,153)"],
                  [10, "rgb(1,108,89)"]
                ]
            },
            "circle-stroke-color": "white",
            "circle-stroke-width": 1,
            "circle-opacity": {
                "stops": [
                    [14, 0],
                    [15, 1]
                ]
            }
        }

    }, 'waterway-label');

        filter: ['==',['number',['get', 'hour']],12]
});
var map = new mapboxgl.Compare(beforeMap, afterMap, {
    // Set this to enable comparing two maps by mouse movement:
    // mousemove: true

});
document.getElementById('slider').addEventListener('input', function(e) {
  var hour = parseInt(e.target.value);
  // update the map
  afterMap.setFilter('alerts-marker', ['==', ['number', ['get', 'hour']], hour]);
  afterMap.setFilter('jams-heat', ['==', ['number', ['get', 'hour']], hour]);
  beforeMap.setFilter('alerts-marker-before', ['==', ['number', ['get', 'hour']], hour]);
  beforeMap.setFilter('jams-heat-before', ['==', ['number', ['get', 'hour']], hour]);

  // converting 0-23 hour to AMPM format
  var ampm = hour >= 12 ? 'PM' : 'AM';
  var hour12 = hour % 12 ? hour % 12 : 12;

  // update text in the UI
  document.getElementById('active-hour').innerText = hour12 + ampm;
});

//click on tree to view dbh in a popup
map.on('click', 'alerts-marker', function (e) {
  new mapboxgl.Popup()
    .setLngLat(e.features[0].geometry.coordinates)
    .setHTML('<b>Type:</b> '+ e.features[0].properties.type)
    .addTo(map);
});
