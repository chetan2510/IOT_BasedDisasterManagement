import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  private getUserListURL = "http://localhost:9902/user/getallusers";
  private deleteUserFromListURL = "http://localhost:9902/user/";
  private addMultipleUsersURL = "http://localhost:9902/user/addmultipleusers";

  constructor(private http: HttpClient) { }

  getUserList(): Observable<any> {
    return this.http.get(this.getUserListURL);
  }

  deleteUser(userName: string): Observable<any> {
    return this.http.delete(this.deleteUserFromListURL+userName);
  }

  addMultipleUsers(): Observable<any> {
    return this.http.get(this.addMultipleUsersURL);
  }
}
