import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../admin-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../User";
import {Rescuer} from "../Rescuer";
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public userArray: any = [];
  public notificationMessage;
  public userNameToBeDeleted = "";
  public rescuerNameToBeDeleted = "";
  public rescuerArray: any = [];
  public notificationMessages: any = [];

  user: User = {
    userName: "",
    latitude: "",
    longitude: "",
    emergencyType: "",
    emergencySeverity: "",
    victimHealthStatus: ""

  };



  rescuer: Rescuer = {
    rescuerName: "",
    latitude: "",
    longitude: "",
    status: "",
    password: "",
  };

  public userNameToBeAdded;
  public useremergencyType;
  public useremergencySeverity;
  public uservictimHealthStatus;

  public latitude;
  public longitude;

  public rescuerNameToBeAdded;
  public rescuerlatitude;
  public rescuerlongitude;
  public rescuerstatus;
  public rescuerpassword;
  public rescuerNameForStatus;
  public rescuerstatusToUpdate;

  constructor(private adminService: AdminServiceService) {  }

  ngOnInit(): void {
    this.getUserList();
    this.getRescuerList();
  }

  private getUserList(): void {
      this.adminService.getUserList().subscribe(res => {
        console.log(res.length);
        this.userArray = [];
        for(let i =0; i < res.length; i++) {
          this.userArray.push(res[i]);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.userArray.filter = filterValue.trim().toLowerCase();
  }

  public addMultipleUser(): void {
    this.adminService.addMultipleUsers().subscribe(res => {
      alert(res.message);
      if(res.message === "Multiple user added successfully") {
        this.getUserList();
      }
    },(error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  public clearAllUsers(): void {
    this.adminService.clearAllUsers().subscribe(res => {
      alert(res.message);
      this.userArray = [];
    },(error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  public deleteUser(): void {
    if(this.userNameToBeDeleted.trim() === "") {
      alert("user field cannot be left empty");
    } else {
      this.adminService.deleteUser(this.userNameToBeDeleted).subscribe(res => {
        alert(res.message);
        this.getUserList();
      },(error: HttpErrorResponse) => {
        alert(error.error.message);
      });
      this.userNameToBeDeleted = "";
    }
  }


  private getRescuerList(): void {
    this.adminService.getAllRescuers().subscribe(res => {
      console.log(res.length);
      this.rescuerArray = [];
      for(let i =0; i < res.length; i++) {
        this.rescuerArray.push(res[i]);
      }
    });
  }

  public addMultipleRescuer(): void {
    this.adminService.addMultipleRescuers().subscribe(res => {
      alert(res.message);
      if(res.message === "Multiple rescuers added to the list") {
        this.getRescuerList();
      }
    },(error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  public clearAllRescuer(): void {
    this.adminService.clearAllRescuers().subscribe(res => {
      alert(res.message);
      this.rescuerArray = [];
    },(error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  public addUser(): void {
    if(this.userNameToBeAdded.trim() !== "" || this.latitude.trim() !== "" || this.longitude.trim() !== "") {
      this.user.userName = this.userNameToBeAdded;
      this.user.latitude = this.latitude;
      this.user.longitude = this.longitude;
      this.user.emergencySeverity = this.useremergencySeverity
      this.user.emergencyType = this.useremergencyType
      this.user.victimHealthStatus = this.uservictimHealthStatus
      this.adminService.addUser(this.user).subscribe(res => {
        alert(res.message);
        this.getUserList();
      }, (error: HttpErrorResponse) => {
        alert(error.error.message);});
    } else {
      alert("Please fill all the fields");
    }
  }


  public addRescuer(): void {
    if(this.rescuerNameToBeAdded.trim() !== "" && this.rescuerlatitude.trim() !== "" && this.rescuerlongitude.trim() !== "") {
      this.rescuer.rescuerName = this.rescuerNameToBeAdded;
      this.rescuer.latitude = this.rescuerlatitude;
      this.rescuer.longitude = this.rescuerlongitude;
      this.rescuer.status = this.rescuerstatus;
      this.rescuer.password = this.rescuerpassword;

      this.adminService.addRescuer(this.rescuer).subscribe(res => {
        alert(res.message);
        this.getRescuerList();
      }, (error: HttpErrorResponse) => {
        alert(error.error.message);});
    } else {
      alert("Please fill all the fields");
    }
  }

  public deleteRescuer(): void {
    if(this.rescuerNameToBeDeleted.trim() === "") {
      alert("rescuer name field cannot be left empty");
    } else {
      this.adminService.deleteRescuer(this.rescuerNameToBeDeleted).subscribe(res => {
        alert(res.message);
        this.getRescuerList();
      },(error: HttpErrorResponse) => {
        alert(error.error.message);
      });
      this.rescuerNameToBeDeleted = "";
    }
  }

  public sendNotificationToUser(): void {
      this.adminService.sendNotificationToUser(this.notificationMessage).subscribe(res => {
        alert(res.notificationMessage);
        this.getAllNotification();
      },(error: HttpErrorResponse) => {
        alert(error.error.message);
      });

  }

  public sendNotificationToRescuer(): void {
      this.adminService.sendNotificationToRescuer(this.notificationMessage).subscribe(res => {
        alert(res.notificationMessage);
        this.getAllNotification();
      },(error: HttpErrorResponse) => {
        alert(error.error.message);
      });
  }

  public getAllNotification() : void {
    this.adminService.getAllNotificationMessage().subscribe(res => {
      console.log(res.length);
      this.notificationMessages = [];
      for(let i =0; i < res.length; i++) {
        this.notificationMessages.push(res[i]);
      }
    } , (error: HttpErrorResponse) => {
  alert(error.error.message);
    });
  }

  public UpdateRescuerStatus(): void {
    this.adminService.updateRescuerStatus(this.rescuerNameForStatus, this.rescuerstatusToUpdate).subscribe(res => {
      alert(res.message);
      this.getRescuerList();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

}
