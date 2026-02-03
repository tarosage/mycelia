
//initializing map and setting view (currently london)
 var map = L.map('map').setView([44.0521, 123.0897], 13);

 //adding tiles
 L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);