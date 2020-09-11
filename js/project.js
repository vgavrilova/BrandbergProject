function initMap() {
  // Create a map from Leaflet
var mymap = L.map('mapid').setView([51.505, -0.09], 13);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(mymap);
}



/* // Adding map
function initMap() {
  // The location of Brandberg
  var brandberg = {lat: -21.133309, lng: 14.583340};
  // The map, centered at Brandberg
  var map = new google.maps.Map(
      document.getElementById('map'), {zoom: 6, center: brandberg});
  // The marker, positioned at Brandberg
  var marker = new google.maps.Marker({position: brandberg, map: map});
} */