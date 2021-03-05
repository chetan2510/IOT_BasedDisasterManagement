import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../admin-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../User";
import { ToastrComponentlessModule } from 'ngx-toastr';
import { ToastrService } from 'ngx-toastr';
//import { CountdownTimerModule } from 'angular-countdown-timer';
//import 'leaflet.offline';

declare const L: any;

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})

export class UserComponent implements OnInit {

// Naming the variables that needs to be initialized

  timeData: any;
  public mymap: any;
  public title = 'Disaster Management App';
  private userNotification;
  public ifClicked = true;                    // "Show Neary VIctims" button to be removed upon click
  public ifShowNearbyVictims = false;
  public ifClickedbutton1 = true;             // "Ask For help" Button to be removed upon click"


  public userNameToBeAdded = "";
  public useremergencyType = "";
  public useremergencySeverity = "";
  public uservictimHealthStatus = "";

  public latitude;
  public longitude;
  public resucerName;

  public userArray: any = [];
  private markersLayer;


  // Initializing the users data
  user: User = {
    userName: "",
    latitude: "",
    longitude: "",
    emergencyType: "",
    emergencySeverity: "",
    victimHealthStatus: ""

  };


  constructor(private adminService: AdminServiceService,private toastr: ToastrService) {
    this.markersLayer = new L.layerGroup();
  }

  // Saving the value of Emergency type Dropdown in a variable 
public changeSelectionEmergencyType(value){
  this.useremergencyType = value
}
// Saving the value of Severity Dropdown in a variable
  public changeSelectionSeverity(value){
    this.useremergencySeverity = value
  }
// Saving the value of Status type Dropdown in a variable
  public changeSelectionStatus(value){
    this.uservictimHealthStatus = value
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
    this.generateMap();                  // Calling the function generateMao()
    // this.getDistance();               // Calling the function getDistance()
  }


  handleEvent(event){
    console.log(event)
  };

  async plotOnMap()  {
    this.ifClicked = false;              // Initializing a boolean value 
    while (true) {
    this.markersLayer.clearLayers();     // This is a layer on the map. Initially clearing the layers so that no markers are left on the layer
    await   this.makeAnAPICall();        // To fet the user data from the database
    this.plotLatsOnMap();                // To plot the user's position on the map using custom markers
    await this.getUserNotification();    // Display the notifications send by the Admins
    await this.delay(5000);              // Continuing the process after every 5 secs, to see if any new user is added and plot it on the map

  }


  }

  /* The generateMap() function displays the complete map on the font-end with user's position on the map*/
  generateMap(){

    if (!navigator.geolocation) {
      console.log('location is not supported');
    }


    /*---- Code to fetch the current location using GPS- POssible Extension to the project----*/

    // navigator.geolocation.getCurrentPosition((position) => {
    //   const coords = position.coords;
    //   this.longitude = coords.longitude;
    //   this.latitude = coords.latitude;
    //   //const latLong = [coords.latitude, coords.longitude];

    //   console.log(
    //     `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
    //   );

    // });
    /*--------------------------------------------------------------------------------------- */


      const latLong=[50.120350,8.651000];            // Initializing the latitudes and longitudes
       this.mymap = L.map('map').setView(latLong, 10);  //Plot the latitude and longitude of the user on map with zoom 9


      L.tileLayer(                           // Initializing map tiles.
        'assets/map/{z}/{x}/{y}.png',       // Loading the already saved map tiles from the "map" folder 
        {
          // attribution:
          //   'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          // id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          // accessToken: 'your.mapbox.access.token',
        }
      ).addTo(this.mymap);
      
    /* Taking the image of red marker to be plotted on the map */
   var redIcon = L.icon({
    iconUrl: 'assets/img/red_shadow.png',
    iconSize:     [25, 41], // size of the icon
});

     let marker =L.marker (latLong, {icon: redIcon}).addTo(this.mymap);  // Plotting the custom markers on the map
      marker.bindPopup('<b>You</b>').openPopup();                        // To Pop up a dialog box on users location  
      

 /* ----Code to show the distance between two markers- POssible Extension to the project----*/

// var markerFrom = L.marker([50.120033,8.6527636], { color: "#F00", radius: 10 });
// var markerTo =  L.circleMarker([50.161064818858684,8.748550415039064], { color: "#4AFF00", radius: 10 });
// var from = markerFrom.getLatLng();
// var to = markerTo.getLatLng();
// markerFrom.bindPopup('pointA ' + (from).toString());
// markerTo.bindPopup('pointB ' + (to).toString());
// // this.mymap.addLayer(markerTo);
// // this.mymap.addLayer(markerFrom);
// var disatance = from.distanceTo(to)

// console.log("distance from point a to point B",from.distanceTo(to).toString(),"m");

/* ----------------------------------------------------------------------------------------*/


    /* To plot a radius of certain diameter to show the area affected by disaster   */
      var circle = L.circle(latLong, {
        color: '#ff6666',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: 14000
    }).addTo(this.mymap);

    /* To display a popup on the radious that the user is in a disaster situation */
      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('You are in Disaster Zone')
        .openOn(this.mymap);

  }

  /* Making an API call to the database to load the data of the users to be plot on the map */
  async makeAnAPICall() {
    this.latitude = [];
    this.longitude = [];
    this.resucerName = [];
    const res = await this.adminService.getUserList().toPromise();
      for(let i =0; i < res.length; i++) {
          this.latitude.push(res[i].latitude);
          this.longitude.push(res[i].longitude);
          this.resucerName.push(res[i].userName);
      };
 }

/* Once the latitudes and longitudes of all the users are fetched using the makeAnAPICall() function, this function plots them on the map using red marker  */
plotLatsOnMap(): void {
     let marker;
     var redIcon = L.icon({
      iconUrl: 'assets/img/red_shadow.png',
      iconSize:     [25, 41], // size of the icon
  });
     for(let i = 0; i < this.latitude.length; i++) {

       marker = L.marker([this.latitude[i], this.longitude[i]],{icon: redIcon}).bindPopup('<b>' + this.resucerName[i]+'</b>');
       marker.addTo(this.markersLayer);
     }
     this.markersLayer.addTo(this.mymap);
   }

  /* This function displays the notification on the User's page send my the Admin  */
  public async getUserNotification() {
    const res= await this.adminService.getUserNotification().toPromise();
    if( res.notificationMessage !== "undefined" && res.notificationMessage !== "") {
      alert("Message from admin: "+res.notificationMessage);
      }
   await this.delay(6000);        // After every 6 secs, the function checks if there is any notification send my admin
  }

  /* Function to intriduce delay in a process */
    delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  /* This function sends the user data[Name,Emergency Type, Emergency Severity,HEalth status,latitude,longitude,] to the back end to be saved in the database */
  public sendUserDataToBackend() : void {

      if(this.userNameToBeAdded !== "" && this.uservictimHealthStatus !== "" && this.useremergencyType !== ""  && this.useremergencySeverity !== "") {
      this.user.userName = this.userNameToBeAdded;
      this.user.latitude = this.latitude;
      this.user.longitude = this.longitude;
      this.user.emergencySeverity = this.useremergencySeverity
      this.user.emergencyType = this.useremergencyType
      this.user.victimHealthStatus = this.uservictimHealthStatus
      this.adminService.addUser(this.user).subscribe(res => {
        alert(res.message);
      }, (error: HttpErrorResponse) => {
        alert(error.error.message);});
        this.ifClickedbutton1 = false;      //  "Ask For help" Button to be removed upon click
        this.ifShowNearbyVictims = true;    // "Show Neary VIctims" button to be removed upon click
    }

    else {
      this.toastr.warning("Please fill all the fields before asking for help"); // If the form is not filled by the user, an error will be displayed
      this.ifClickedbutton1 = true;
    }

    this.timeData = 120;                // Time value to be displayed on a count down timer on the front end
  }



}




