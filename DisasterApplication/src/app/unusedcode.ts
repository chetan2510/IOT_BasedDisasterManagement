//     var redIcon = L.icon.Default({
//      iconUrl: '/img/marker-icon-2x-black.png/',
//      shadowUrl: '/img/marker-icon-black.png/',
//       iconSize: [38, 95],
//       iconAnchor: [22, 94],
//       popupAnchor: [-3, -76],
//       shadowSize: [68, 95],
//       shadowAnchor: [22, 94]
//  });



// shadowSize:   [50, 64], // size of the shadow
//  iconAnchor:   [30, 48], // point of the icon which will correspond to marker's location
//  shadowAnchor: [4, 62],  // the same for the shadow
//  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor


// let marker = new L.marker (latLong, {icon: greenIcon}).addTo(this.mymap);

//    async happen(){
//
//     //while (true){
//     console.log("here we go again")
//
//      // var map;
//      // var markers = [];
//      // var locationCoor = [];
//       //var marker;
//       let markersLayer = new L.layerGroup(); //new L.FeatureGroup(); // NOTE: Layer is created here!
//       console.log("Starting",markersLayer);
//
//
//     //  markersLayer.clearLayers();
//
//       this.adminService.getUserList().subscribe(res => {
//         console.log("total entries: "+res.length);
// // NOTE: The first thing we do here is clear the markers from the layer.
//
// //this.mymap.removeLayer(markersLayer)
// //console.log("Starting ahead",markersLayer)
// //markersLayer.clearLayers();
// console.log("Layer is cleard",markersLayer);
//
// for(let i =0; i < res.length; i++) {
//
//
//   var latA = res[i].latitude;
//   var lonA = res[i].longitude;
//  // locationCoor[i]=[latA,lonA];
//
//   let marker = L.marker([latA, lonA]).bindPopup('<b>RescueCentre A</b>');
//   console.log("Marker value: ",marker)
//
// //console.log("I am before for loop");
// marker.addTo(markersLayer);
// //markersLayer.addLayer(marker);
//         console.log("I am in for loop",markersLayer);
//
// }
// console.log("I am outside for loop");
//
//
//
//
//
// console.log("This :",markersLayer);
//
// // markersLayer.addTo(this.mymap);
// //this.mymap.addLayer(markersLayer)
// //markersLayer.clearLayers();
// console.log("clear layers");
//
// //markersLayer.clearLayers();
// //this.mymap.removeLayer(markersLayer)
// console.log("after clear",markersLayer);
// //markersLayer.addTo(this.mymap);
//
//
//
// markersLayer.addTo(this.mymap);
// console.log("outside the API");
// markersLayer.clearLayers();
//       });
//
//
//   //   this.adminService.getUserList().subscribe(res => {
//   //     console.log("total entries: "+res.length);
//   //   //var markerB={[res.latitude,res.longitude]}
//   //  // console.log("MarkerB: "+markerB);
//   //      this.userArray = [];
//   //     //  this.mymap.removeLayer(this.mymap);
//   //      for(let i =0; i < res.length; i++) {
//   //       const latLongA= [ res[i].latitude, res[i].longitude];
//   //       var markerA = L.marker(latLongA).addTo(this.mymap);
//   //       //this.mymap.removeLayer();
//   //       const nameA= res[i].userName;
//   //       markerA.bindPopup('<b>RescueCentre A</b>'+nameA).openPopup();
//
//
//   //        //this.userArray.push(res[i].latitude);
//   //      }
//   //      console.log(this.userArray);
//   //   });
//    // await delay(10000);
//  // }
//
//       //const latLongA = [ +0.00619366, 8.6527636];
//
//     //  const latLongB = [50.161064818858684, 8.748550415039064];
//
//       //const latLongC = [50.12982265022155, 8.75267028808594];
//
//     //  let markerA = L.marker(latLongA).addTo(this.mymap);
//     //  markerA.bindPopup('<b>RescueCentre A</b>').openPopup();
//
//      // let markerB = L.marker(latLongB).addTo(this.mymap);
//      // markerB.bindPopup('<b>RescueCentre B</b>').openPopup();
//
//      // let markerC = L.marker(latLongC).addTo(this.mymap);
//      // markerC.bindPopup('<b>RescueCentre C</b>').openPopup();
//
//
//
//     };


// this.delay(2000);

// while(true) {
//   this.plotOnMap();
//   this.delay(5000);
// }


