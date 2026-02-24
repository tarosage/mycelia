//initializing map and setting view to OSU
var map = L.map('map').setView([44.5646, -123.2620], 13);

//adding tiles
    L.tileLayer('https://api.mapbox.com/styles/v1/tarosage/cmm05cp7o003t01su2jom52sy/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoidGFyb3NhZ2UiLCJhIjoiY21semloeDZwMDc3ZzNlcTJ0ZmNvYjZ3eiJ9.gz6DoGzeLKlwzKzmeDveUQ', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);


//custom marker icon

          var mushroomMarker = L.icon({
               iconUrl: 'mushroommarker.png',
               iconSize: [38, 38],
               iconAnchor: [19, 38],
               popupAnchor: [0, -38]
          });


//adding locations to the map, needed to troubleshoot with chatGPT here
fetch('data/campusfungi/mushrooms.json')
  .then(response => response.json())
  .then(data => {

    L.geoJSON(data, {
      // turn each Point feature into a marker
      pointToLayer: function (feature, latlng) {
        return L.marker(latlng, { icon: mushroomMarker });
      },

      // attach popups using properties from your JSON
      onEachFeature: function (feature, layer) {
  const p = feature.properties;

  const popupHTML = `
  <strong>${p.popupContent}</strong><br>
  <em>${p.dateFound}</em><br><br>
  <img src= "https://raw.githubusercontent.com/tarosage/mycelia/refs/heads/main/data/campusfungi/images/${p.image}" width="150">
`;

  layer.bindPopup(popupHTML);
}

    }).addTo(map);

  })
  .catch(err =>
    console.error('Error connecting to mycelial network.', err)
  );



   
/* 

mapboxgl.accessToken = 'pk.eyJ1IjoidGFyb3NhZ2UiLCJhIjoiY21semloeDZwMDc3ZzNlcTJ0ZmNvYjZ3eiJ9.gz6DoGzeLKlwzKzmeDveUQ';
    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/tarosage/cmm05cp7o003t01su2jom52sy', 
        projection: 'globe', // display the map as a globe
        zoom: 12, // initial zoom level, 0 is the world view, higher values zoom in
        center: [-123.2620, 44.5646]
    });

    map.addControl(new mapboxgl.NavigationControl());
    map.scrollZoom.disable();

    map.on('style.load', () => {
        map.setFog({}); // Set the default atmosphere style
    });
    */