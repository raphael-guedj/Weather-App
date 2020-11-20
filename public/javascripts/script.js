var mymap = L.map("worldmap", {
  center: [48.866667, 2.333333],
  zoom: 4,
});

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution:
    '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(mymap);

var nomCity = document.getElementsByClassName("city");

for (var i = 0; i < nomCity.length; i++) {
  var longitude = nomCity[i].dataset.longitude;
  var latitude = nomCity[i].dataset.latitude;
  var nomVille = nomCity[i].dataset.name;

  var customIcon = L.icon({
    iconUrl: "/images/leaf-green.png",
    shadowUrl: "/images/leaf-shadow.png",
    iconSize: [38, 95],
    shadowSize: [50, 64],

    iconAnchor: [22, 94],
    shadowAnchor: [4, 62],

    popupAnchor: [-3, -76],
  });

  var marker = L.marker([latitude, longitude], { icon: customIcon }).addTo(
    mymap
  );
  // var options = {
  //   width: 60, //size of main popup
  //   height: 60, //size of main popup
  //   top: 20, //top offset of main popup from map
  //   left: 300, //left offset of main popup from map
  //   strenth: 20, //length of the arrow
  //   base: 10, // width of the base of arrow
  //   angle: 0, //dyn value don't care
  //   background: "#fdffb6", //background color of the speechBublle
  //   borderThick: 1, // the thickness of the borders' speechbubble
  //   borderColor: "#606c38", // color of the border
  //   borderRadius: 10, // radius for border
  // };
  marker.bindPopup(`<b> ${nomVille}</b>`);
}
