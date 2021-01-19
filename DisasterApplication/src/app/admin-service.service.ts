import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private getUserListURL = "http://localhost:9902/user/getallusers";
  private deleteUserFromListURL = "http://localhost:9902/user/deleteuser";
  private addMultipleUsersURL = "http://localhost:9902/user/addmultipleusers";
  private clearAllUsersURl = "http://localhost:9902/user/clearallusers";
  private getAllRescuersURL = "http://localhost:9902/rescuer/getallrescuers";
  private addMultipleRescuersURL = "http://localhost:9902/rescuer/addmultiplerescuers";
  private clearAllRescuerURL = "http://localhost:9902/rescuer/clearallrescuers"



  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(this.getUserListURL);
  }

  deleteUser(userName: string): Observable<any> {
    return this.http.delete(this.deleteUserFromListURL+ "?username=" +userName);
  }

  addMultipleUsers(): Observable<any> {
    return this.http.get(this.addMultipleUsersURL);
  }

  clearAllUsers() : Observable<any> {
    return this.http.get(this.clearAllUsersURl);
  }

  getAllRescuers() : Observable<any> {
    return this.http.get(this.getAllRescuersURL);
  }

  addMultipleRescuers() : Observable<any> {
    return this.http.get(this.addMultipleRescuersURL);
  }

  clearAllRescuers() : Observable<any> {
    return this.http.get(this.clearAllRescuerURL);
  }
}
