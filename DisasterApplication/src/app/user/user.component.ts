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

  public emergencyType;
  public userArray: any = [];
  constructor(private adminService: AdminServiceService) { }



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
    iconSize:     [38, 95], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});
  

    // var  redIcon = L.AwesomeMarkers.icon({
    //   markerColor: "red"
    //   });

   // var redIcon = L.Icon.Default.prototype.options({className: 'my-div-icon'});
  
   
     // let marker = new L.marker (latLong, {icon: greenIcon}).addTo(this.mymap);

     var myIcon = L.divIcon({className: 'my-div-icon'});

     L.marker (latLong, {icon: greenIcon}).addTo(this.mymap);
      //marker.bindPopup('<b>You</b>').openPopup();
      //marker._icon.classList.add("huechange");

      // let markerB = L.marker(latLongB).addTo(mymap);
      // markerB.bindPopup('<b>HiB</b>').openPopup();

      // let markerC = L.marker(latLongC).addTo(mymap);
      // markerC.bindPopup('<b>HiC</b>').openPopup();


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

  async happen(){

    //while (true){

    

    this.adminService.getUserList().subscribe(res => {
      console.log("total entries: "+res.length);
       this.userArray = [];
       for(let i =18; i < 21; i++) {
        const latLongA= [ res[i].latitude, res[i].longitude];
        let markerA = L.marker(latLongA).addTo(this.mymap);
        markerA.bindPopup('<b>RescueCentre A</b>').openPopup();
        console.log("latLong: "+latLongA)

         //this.userArray.push(res[i].latitude);
       }
       console.log(this.userArray);
    });
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



    }

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
  
}

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}