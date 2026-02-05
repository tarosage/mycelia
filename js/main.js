
//initializing map and setting view to OSU
 var map = L.map('map').setView([44.5646, 123.2620], 13);

 //adding tiles
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Calling the Data
fetch('/Users/tarocole/Desktop/mycelia/data/fungi on campus')
    .then(response => response.json())
    .then(data => {
        L.geoJSON(data) .addTo(map);
    })
    .catch(error => console.error('Error: '))