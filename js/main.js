
//initializing map and setting view to OSU

var map = L.map('map').setView([44.5646, -123.2620], 13);

//adding tiles
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
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