import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminServiceService} from "../admin-service.service";
import {Rescuer} from "../Rescuer";
import {HttpErrorResponse} from "@angular/common/http";

declare const L: any;

@Component({
  selector: 'app-rescuer',
  templateUrl: './rescuer.component.html',
  styleUrls: ['./rescuer.component.css']
})
export class RescuerComponent implements OnInit {

  public rescuerUsername;
  public password;
  public isSignInSuccessfull = false;
  public latitude;
  public showPortal = false;
  public longitude;
  public userlatitude;
  public userlongitude;
  public isTakingBreak = false;
  public users;
  public mymap: any;
  private markersLayer;
  public rescuers;
  public rescuer: Rescuer = {
    rescuerName: "",
    latitude: "",
    longitude: "",
    status: "",
    password: "",
  };

  constructor(private router: Router, private adminService: AdminServiceService) {
    this.markersLayer = new L.layerGroup();
  }

  ngOnInit(): void {

  }

  public signIn(): void {

    if (this.rescuerUsername === "" || this.password === "") {
      alert("Fill all the fields");
      return;
    }
    this.generateMap();
    this.rescuer.password = this.password;
    this.rescuer.status = "Active";
    this.rescuer.rescuerName = this.rescuerUsername;
    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.rescuer.longitude = coords.longitude + "";
      this.rescuer.latitude = coords.latitude + "";
    });

    this.adminService.loginRescuer(this.rescuer).subscribe(res => {
      if (res.message === "Fail") {
        alert("Login failed");
      } else {
        // alert("Login successfull");
        this.isSignInSuccessfull = true;
      }
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  public signUp(): void {
    this.router.navigateByUrl("/rescuersignup");
  }

  public startRescuing(): void {
    this.updateStatusOfRescuer("Active");
    this.isTakingBreak = true;
   this.plotOnMap();
  }

  async plotOnMap()  {
    while (this.isTakingBreak) {
      this.markersLayer.clearLayers();
      await  this.makeAnAPICall();
      this.plotLatsOnMap();
      await this.getRescuerNotification();
      await this.delay(5000);

    }
  }

  async makeAnAPICall() {


// To get Rescuers data in the array
    this.latitude = [];
    this.longitude = [];
    this.rescuers = [];

    const res = await this.adminService.getAllRescuers().toPromise();
    for(let i =0; i < res.length; i++) {
      if(res[i].status !== "Inactive") {
        this.latitude.push(res[i].latitude);
        this.longitude.push(res[i].longitude);
        this.rescuers.push(res[i].rescuerName);
      }
    };

// To get Users data in the array
this.userlatitude = [];
this.userlongitude = [];
this.users = [];


    const resUsers = await this.adminService.getUserList().toPromise();
    for(let i =0; i < resUsers.length; i++) {
      this.userlatitude.push(resUsers[i].latitude);
      this.userlongitude.push(resUsers[i].longitude);
      this.users.push(resUsers[i].userName);
    };
  }

  plotLatsOnMap(): void {
    let marker;
    for(let i = 0; i < this.latitude.length; i++) {
      var blueIcon = L.icon({
        iconUrl: 'assets/img/green.png',
        // iconRetinaUrl: 'img/marker-icon-2x-black.png',
        iconSize:     [25, 41], // size of the icon

      });
      marker = L.marker([this.latitude[i], this.longitude[i]], {icon: blueIcon}).bindPopup('<b>' +this.rescuers[i] +'</b>');
      marker.addTo(this.markersLayer);
    }



    for(let i = 0; i < this.userlatitude.length; i++) {
      var redIcon = L.icon({
        iconUrl: 'assets/img/red.png',
        // iconRetinaUrl: 'img/marker-icon-2x-black.png',
        iconSize:     [25, 41], // size of the icon

      });
      marker = L.marker([this.userlatitude[i], this.userlongitude[i]],{icon: redIcon}).bindPopup('<b>' +this.users[i] +'</b>');
      marker.addTo(this.markersLayer);
    }

    this.markersLayer.addTo(this.mymap);

  }

  public async getRescuerNotification() {
      const res= await this.adminService.getRescuerNotification().toPromise();
      if( res.notificationMessage !== "undefined" && res.notificationMessage !== "") {
        alert("Message from admin: "+res.notificationMessage);
      }
      // ,(error: HttpErrorResponse) => {
      //   alert(error.error.message);
      // });
      await this.delay(6000);
  }


  public generateMap(){

    // if (!navigator.geolocation) {
    //   console.log('location is not supported');
    // }


    navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.longitude = coords.longitude;
      this.latitude = coords.latitude;
      //const latLong = [coords.latitude, coords.longitude];
      const latLong=[50.1001,8.6521];
      console.log(
        `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
      );
    });
    const latLong=[50.1001,8.6521];
      this.mymap = L.map('map').setView(latLong, 10);

      L.tileLayer(
        'assets/map/{z}/{x}/{y}.png',
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

      var greenIcon = L.icon({
        iconUrl: 'assets/img/green.png',
        // iconRetinaUrl: 'img/marker-icon-2x-black.png',
        iconSize:     [25, 41], // size of the icon

      });

      let marker =L.marker (latLong, {icon: greenIcon}).addTo(this.mymap);
      marker.bindPopup('<b>'+ this.rescuerUsername+'</b>').openPopup();
      //marker._icon.classList.add("huechange");

// //    HERE
//       var markerFrom = L.marker([50.120033,8.6527636], { color: "#F00", radius: 10 });
//       var markerTo =  L.circleMarker([50.161064818858684,8.748550415039064], { color: "#4AFF00", radius: 10 });
//       var from = markerFrom.getLatLng();
//       var to = markerTo.getLatLng();
//       markerFrom.bindPopup('pointA ' + (from).toString());
//       markerTo.bindPopup('pointB ' + (to).toString());
// // this.mymap.addLayer(markerTo);
// // this.mymap.addLayer(markerFrom);
//       var disatance = from.distanceTo(to)

//       console.log("distance from point a to point B",from.distanceTo(to).toString(),"m");

      // var circle = L.circle(latLong, {
      //   color: '#ff6666',
      //   fillColor: '#f03',
      //   fillOpacity: 0.5,
      //   radius: 1500
      //
      // }).addTo(this.mymap);

      let popup = L.popup()
        .setLatLng(latLong)
        .setContent('Start Moving and helping people')
        .openOn(this.mymap);
    // });
    // this.watchPosition();
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

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
  }

  public stopRescuing() : void {
    this.isTakingBreak = false;
    this.updateStatusOfRescuer("Inactive");
    // make an api call to make him inactive
  }


  public updateStatusOfRescuer(status: string): void {
    this.adminService.updateRescuerStatus(this.rescuerUsername, status).subscribe(res => {
      alert(res.message);
      }, (error: HttpErrorResponse) => {
      alert(error.error.message);});
  }

  public openNewWindow() {
    window.open('http://localhost:4200/chat?userName='+this.rescuerUsername, '', 'width=600,height=400,left=200,top=200');
    // this.router.navigate(['/chat'], { queryParams: { userName: this.rescuerUsername } } );
  }

}
