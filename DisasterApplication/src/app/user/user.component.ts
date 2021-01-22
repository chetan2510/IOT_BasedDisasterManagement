import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../admin-service.service";
import {HttpErrorResponse} from "@angular/common/http";

declare const L: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

  public mymap: any;
  public title = 'Covorsicht';
  private userNotification;

  public emergencyType;
  public userArray: any = [];
  private latitude: any = [];
  private longitude: any = [];
  private markersLayer;
  constructor(private adminService: AdminServiceService) {
    this.markersLayer = new L.layerGroup();
  }



public changeSelectionOverviewExample(value){

  this.emergencyType = value
  console.log(this.emergencyType);
}

  foods: any[] = [
    {value: 'earthquake', viewValue: 'Earthquakes'},
    {value: 'floods', viewValue: 'Floods'},
    {value: 'cyclone', viewValue: 'Cyclone'},
    {value: 'others', viewValue: 'Others'}
  ];



  items: any[] = [
    {value: 'critical', viewValue: 'Critical'},
    {value: 'high', viewValue: 'High'},
    {value: 'moderate', viewValue: 'Moderate'},
    {value: 'low', viewValue: 'Low'}
  ];

  products: any[] = [
    {value: 'severe', viewValue: 'Severe'},
    {value: 'fatigue', viewValue: 'Fatigue'},
    {value: 'normal', viewValue: 'Normal'},
    {value: 'good', viewValue: 'Good'}
  ];

  ngOnInit() {
    this.generateMap();
    this.getDistance();
  }


  plotOnMap() : void {
    // this.latitude = [];
    // this.longitude = [];
    this.markersLayer.clearLayers();
    this.makeAnAPICall();
    this.plotLatsOnMap();
  }
  generateMap(){




    if (!navigator.geolocation) {
      console.log('location is not supported');
    }


    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      const latLong = [coords.latitude, coords.longitude];

      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
       this.mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(this.mymap);

  //     var redIcon = L.icon.Default({
  //      iconUrl: '/img/marker-icon-2x-black.png/',
  //      shadowUrl: '/img/marker-icon-black.png/',
  //       iconSize: [38, 95],
  //       iconAnchor: [22, 94],
  //       popupAnchor: [-3, -76],
  //       shadowSize: [68, 95],
  //       shadowAnchor: [22, 94]
  //  });


  var greenIcon = L.icon({
    iconUrl: 'assets/img/red_shadow.png',
   // iconRetinaUrl: 'img/marker-icon-2x-black.png',
    iconSize:     [25, 41], // size of the icon
   // shadowSize:   [50, 64], // size of the shadow
  //  iconAnchor:   [30, 48], // point of the icon which will correspond to marker's location
  //  shadowAnchor: [4, 62],  // the same for the shadow
  //  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// var theMarker = {};

// //var theMarker = L.layerGroup().addTo(this.mymap);

//   this.mymap.on('click',function(e){
//     console.log("clicked")
//    const latA = e.latlng.lat;
//     const lonA = e.latlng.lng;

//     console.log("You clicked the map at LAT: "+ latA+" and LONG: "+lonA );
//         //Clear existing marker,

//         // if (theMarker != undefined) {
//         //       theMarker.remove() ;
//         // };

//     //Add a marker to show where you clicked.
//       theMarker = L.marker([latA,lonA]).addTo(this.mymap);
     // theMarker.addLayer(this.mymap)
//});

     // let marker = new L.marker (latLong, {icon: greenIcon}).addTo(this.mymap);

     let marker =L.marker (latLong, {icon: greenIcon}).addTo(this.mymap);
      marker.bindPopup('<b>You</b>').openPopup();
      //marker._icon.classList.add("huechange");

      // let markerB = L.marker(latLongB).addTo(mymap);
      // markerB.bindPopup('<b>HiB</b>').openPopup();

      // let markerC = L.marker(latLongC).addTo(mymap);
      // markerC.bindPopup('<b>HiC</b>').openPopup();

//    HERE
var markerFrom = L.marker([50.120033,8.6527636], { color: "#F00", radius: 10 });
var markerTo =  L.circleMarker([50.161064818858684,8.748550415039064], { color: "#4AFF00", radius: 10 });
var from = markerFrom.getLatLng();
var to = markerTo.getLatLng();
markerFrom.bindPopup('pointA ' + (from).toString());
markerTo.bindPopup('pointB ' + (to).toString());
this.mymap.addLayer(markerTo);
this.mymap.addLayer(markerFrom);
var disatance = from.distanceTo(to)

console.log("distance from point a to point B",from.distanceTo(to).toString(),"m");

// HERE


      var circle = L.circle(latLong, {
        color: '#ff6666',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 1500

    }).addTo(this.mymap);

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('You are in Disaster Zone')
        .openOn(this.mymap);
    });
    this.watchPosition();
  }

  getDistance(){



// var _distance;
// var _length;
//   const latLongZ = [50.1200336+0.00619366, 8.6527636];
//  const latLongY = [50.161064818858684, 8.748550415039064];
//   //function refreshDistanceAndLength() {
//     _distance = L.GeometryUtil.distance(this.mymap, latLongZ, latLongY);
//    // _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
//     console.log("Distance is:",_distance);
//     console.log("Distance is:",_length);


//     var
//   _firstLatLng,
//   _firstPoint,
//   _secondLatLng,
//   _secondPoint,
//   _distance,
//   _length,
//   _polyline;

//   Function
//   this.mymap.on('click', function(e) {

//     if (!_firstLatLng) {
//       _firstLatLng = e.latlng;
//       _firstPoint = e.layerPoint;
//       L.marker(_firstLatLng).addTo(this.mymap).bindPopup('Point A<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
//     } else {
//       _secondLatLng = e.latlng;
//       _secondPoint = e.layerPoint;
//       L.marker(_secondLatLng).addTo(this.map).bindPopup('Point B<br/>' + e.latlng + '<br/>' + e.layerPoint).openPopup();
//     }

//     if (_firstLatLng && _secondLatLng) {
//       // draw the line between points
//       L.polyline([_firstLatLng, _secondLatLng], {
//         color: 'red'
//       }).addTo(this.mymap);

//       refreshDistanceAndLength();
//     }
//   })

// //Function
//   this.mymap.on('zoomend', function(e) {
//     refreshDistanceAndLength();
//   })

// //Function
// const latLongZ = [50.1200336+0.00619366, 8.6527636];
//  const latLongY = [50.161064818858684, 8.748550415039064];
//   function refreshDistanceAndLength() {
//     _distance = L.GeometryUtil.distance(this.mymap, _firstLatLng, _secondLatLng);
//     _length = L.GeometryUtil.length([_firstPoint, _secondPoint]);
//     console.log("Distance is:",_distance);
//     console.log("Distance is:",_length);
//    // document.getElementById('distance').innerHTML = _distance;
//    // document.getElementById('length').innerHTML = _length;
//   }

  };


   async makeAnAPICall() {
     console.log(this.latitude.length);
     this.latitude = [];
     this.longitude = [];
      await this.adminService.getUserList().subscribe(res => {
       for(let i =0; i < res.length; i++) {
         this.latitude.push(res[i].latitude);
         this.longitude.push(res[i].longitude);
       }
     });

     console.log(this.latitude.length);
  }

  clearLayers(): void {

     console.log("In clear function")
       this.markersLayer.clearLayers();

    console.log("after clear in clear function",this.markersLayer);

      // this.mymap.removeLayer(this.markersLayer)

  }

   plotLatsOnMap(): void {
     let marker;
     for(let i = 0; i < this.latitude.length; i++) {
       marker = L.marker([this.latitude[i], this.longitude[i]]).bindPopup('<b>RescueCentre A</b>');
       marker.addTo(this.markersLayer);
     }
     // console.log("I am in for loop",this.markersLayer);
     // console.log("I am outside for loop");
     // console.log("This :",this.markersLayer);
     // console.log("clear layers");
     console.log("after clear in plot on map function",this.markersLayer);
     this.markersLayer.addTo(this.mymap);
     // console.log("outside the API");
   }

   async happen(){

    //while (true){
    console.log("here we go again")

     // var map;
     // var markers = [];
     // var locationCoor = [];
      //var marker;
      let markersLayer = new L.layerGroup(); //new L.FeatureGroup(); // NOTE: Layer is created here!
      console.log("Starting",markersLayer);


    //  markersLayer.clearLayers();

      this.adminService.getUserList().subscribe(res => {
        console.log("total entries: "+res.length);
// NOTE: The first thing we do here is clear the markers from the layer.

//this.mymap.removeLayer(markersLayer)
//console.log("Starting ahead",markersLayer)
//markersLayer.clearLayers();
console.log("Layer is cleard",markersLayer);

for(let i =0; i < res.length; i++) {


  var latA = res[i].latitude;
  var lonA = res[i].longitude;
 // locationCoor[i]=[latA,lonA];

  let marker = L.marker([latA, lonA]).bindPopup('<b>RescueCentre A</b>');
  console.log("Marker value: ",marker)

//console.log("I am before for loop");
marker.addTo(markersLayer);
//markersLayer.addLayer(marker);
        console.log("I am in for loop",markersLayer);

}
console.log("I am outside for loop");





console.log("This :",markersLayer);

// markersLayer.addTo(this.mymap);
//this.mymap.addLayer(markersLayer)
//markersLayer.clearLayers();
console.log("clear layers");

//markersLayer.clearLayers();
//this.mymap.removeLayer(markersLayer)
console.log("after clear",markersLayer);
//markersLayer.addTo(this.mymap);



markersLayer.addTo(this.mymap);
console.log("outside the API");
markersLayer.clearLayers();
      });


  //   this.adminService.getUserList().subscribe(res => {
  //     console.log("total entries: "+res.length);
  //   //var markerB={[res.latitude,res.longitude]}
  //  // console.log("MarkerB: "+markerB);
  //      this.userArray = [];
  //     //  this.mymap.removeLayer(this.mymap);
  //      for(let i =0; i < res.length; i++) {
  //       const latLongA= [ res[i].latitude, res[i].longitude];
  //       var markerA = L.marker(latLongA).addTo(this.mymap);
  //       //this.mymap.removeLayer();
  //       const nameA= res[i].userName;
  //       markerA.bindPopup('<b>RescueCentre A</b>'+nameA).openPopup();


  //        //this.userArray.push(res[i].latitude);
  //      }
  //      console.log(this.userArray);
  //   });
   // await delay(10000);
 // }

      //const latLongA = [50.1200336+0.00619366, 8.6527636];

    //  const latLongB = [50.161064818858684, 8.748550415039064];

      //const latLongC = [50.12982265022155, 8.75267028808594];

    //  let markerA = L.marker(latLongA).addTo(this.mymap);
    //  markerA.bindPopup('<b>RescueCentre A</b>').openPopup();

     // let markerB = L.marker(latLongB).addTo(this.mymap);
     // markerB.bindPopup('<b>RescueCentre B</b>').openPopup();

     // let markerC = L.marker(latLongC).addTo(this.mymap);
     // markerC.bindPopup('<b>RescueCentre C</b>').openPopup();



    };



  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }

  public getUserNotification(): void {
    this.adminService.getUserNotification().subscribe(res => {
      if( res.notification === "") {
        alert("Message: No notification avaialable")
      } else {
        alert("Message: "+res.notification);
      }
      this.userNotification = res.notification;
    },(error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }



}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}
