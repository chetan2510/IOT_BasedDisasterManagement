import { Component, OnInit } from '@angular/core';
import {Rescuer} from "../Rescuer";
import {HttpErrorResponse} from "@angular/common/http";
import {AdminServiceService} from "../admin-service.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-rescuer-sign-up',
  templateUrl: './rescuer-sign-up.component.html',
  styleUrls: ['./rescuer-sign-up.component.css']
})
export class RescuerSignUpComponent implements OnInit {
  public rescuerUsername: string = "";
  public password: string = "";
  public latitude;
  public longitude;
  public rescuer: Rescuer = {
    rescuerName: "",
    latitude: "",
    longitude: "",
    status: "",
    password: "",
  };

  constructor(private adminService: AdminServiceService, private router: Router) { }

  ngOnInit(): void {
    this.fetchCoordinates();
  }

  public fetchCoordinates(): void {
      navigator.geolocation.getCurrentPosition((position) => {
      const coords = position.coords;
      this.longitude = coords.longitude;
      this.latitude = coords.latitude;
    });
  }
  public signUp(): void {

    if(this.rescuerUsername === ""  || this.password  === "") {
      alert("Please fill the user name and password correctly")
      return;
    }
    this.rescuer.password = this.password;
    this.rescuer.status = "Active";
    this.rescuer.rescuerName = this.rescuerUsername;
   this.rescuer.longitude = this.longitude;
   this.rescuer.latitude = this.latitude;

    this.adminService.addRescuer(this.rescuer).subscribe(res => {
        alert(res.message);
      this.router.navigateByUrl("/rescuer");
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

}
