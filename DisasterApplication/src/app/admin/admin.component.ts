import { Component, OnInit } from '@angular/core';
import {AdminServiceService} from "../admin-service.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public userArray: any = [];
  public userNameToBeDeleted = "";
  public rescuerArray: any = [];
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.getUserList();
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
}
