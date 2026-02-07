


//initializing map and setting view to OSU

          var map = L.map('map').setView([44.5646, -123.2620], 13);

//adding tiles
          L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}', {
           maxZoom: 19,
           attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            ext: 'png'
          }).addTo(map);


           //custom icon for marker         
          var mushroomMarker = L.icon({
               iconUrl: 'mushroommarker.png',
 //how do I make the size proportional...?
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
        return L.marker[(latlng), {icon: mushroomMarker}];
      },

      // attach popups using properties from JSON
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