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
  constructor(private adminService: AdminServiceService) { }

  ngOnInit(): void {
    this.getUserList();
  }

  private getUserList(): void {
      this.adminService.getUserList().subscribe(res => {
        console.log(res.length);
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

  public deleteUser(): void {
    if(this.userNameToBeDeleted.trim() === "") {
      alert("user field cannot be left empty");
    } else {
      this.adminService.deleteUser(this.userNameToBeDeleted).subscribe(res => {
        console.log(res.message);
      });
      alert("User delete successfull");
      this.userNameToBeDeleted = "";
    }
  }
}
