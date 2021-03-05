import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../admin-service.service";
import {HttpErrorResponse} from "@angular/common/http";
import {User} from "../User";
import {Rescuer} from "../Rescuer";
import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  // Naming the variables that needs to be initialized

  public userArray: any = [];
  public notificationMessage;
  public userNameToBeDeleted = "";
  public rescuerNameToBeDeleted = "";
  public rescuerArray: any = [];
  public notificationMessages: any = [];

  // Initializing the Users data
  user: User = {
    userName: "",
    latitude: "",
    longitude: "",
    emergencyType: "",
    emergencySeverity: "",
    victimHealthStatus: ""

  };

// Initializing the Rescuers data
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

  constructor(private adminService: AdminServiceService,private toastr: ToastrService, private router: Router) {  }


  ngOnInit(): void {
    this.getUserList();                 // Calling the function getUserList()
    this.getRescuerList();              // Calling the function getRescuerList()
  }

  UsersAction(){
  }

  // This function loads the User data from the database through an API call
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

  // This function loads all the users from the database and display them on Admin Page
  public addMultipleUser(): void {
    this.adminService.addMultipleUsers().subscribe(res => {
      alert(res.message);
      if(res.message === "Multiple user added successfully") {
        this.getUserList();
      }
    },(error: HttpErrorResponse) => {
      this.toastr.error(error.error.message);
    });
  }

  // This function clears all the users from the Admin Page
  public clearAllUsers(): void {
    this.adminService.clearAllUsers().subscribe(res => {
      alert(res.message);
      this.userArray = [];
    },(error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  // This function deletes a specific user from the database
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

// This function loads the Rescuers data from the database through an API call
  private getRescuerList(): void {
    this.adminService.getAllRescuers().subscribe(res => {
      console.log(res.length);
      this.rescuerArray = [];
      for(let i =0; i < res.length; i++) {
        this.rescuerArray.push(res[i]);
      }
    });
  }

  // This function loads all the Rescuers from the database and display them on Admin Page
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

  // This function clears all the Rescuerss from the Admin Page
  public clearAllRescuer(): void {
    this.adminService.clearAllRescuers().subscribe(res => {
      alert(res.message);
      this.rescuerArray = [];
    },(error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  // This function allows to the Admin to manually add a User from the Admin Page
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
      this.toastr.error("Please fill all the fields");
    }
  }

  // This function allows to the Admin to manually add a Rescuer from the Admin Page
  public addRescuer(): void {
    if(this.rescuerNameToBeAdded.trim() !== "" && this.rescuerlatitude.trim() !== "" && this.rescuerlongitude.trim() !== "") {
      this.rescuer.rescuerName = this.rescuerNameToBeAdded;
      this.rescuer.latitude = this.rescuerlatitude;
      this.rescuer.longitude = this.rescuerlongitude;
      this.rescuer.status = "Active";
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

  // This function allows to the Admin to manually delete a specific Rescuer from the Admin Page
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

  // This function allows to the Admin to send notification message to the Users
  public sendNotificationToUser(): void {
      this.adminService.sendNotificationToUser(this.notificationMessage).subscribe(res => {
        alert(res.notificationMessage);
        this.getAllNotification();
      },(error: HttpErrorResponse) => {
        alert(error.error.message);
      });

  }

  // This function allows to the Admin to send notification message to the Rescuers
  public sendNotificationToRescuer(): void {
      this.adminService.sendNotificationToRescuer(this.notificationMessage).subscribe(res => {
        alert(res.notificationMessage);
        this.getAllNotification();
      },(error: HttpErrorResponse) => {
        alert(error.error.message);
      });
  }

  // This function display all the notifications send to the users and the rescuers by the admin on Admin page
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

  // This functions updates the status of the Rescuer whether he is active and rescuing or taking a break
  public UpdateRescuerStatus(): void {
    this.adminService.updateRescuerStatus(this.rescuerNameForStatus, this.rescuerstatusToUpdate).subscribe(res => {
      alert(res.message);
      this.getRescuerList();
    }, (error: HttpErrorResponse) => {
      alert(error.error.message);
    });
  }

  // This function opens a new window on the Admin Page to have a real time chat with the Rescuers
  public startChat() {
    window.open('http://localhost:4200/chat?userName=Admin', '', 'width=600,height=400,left=200,top=200');
    
  }


}
