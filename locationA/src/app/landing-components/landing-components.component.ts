import { Component, OnInit } from '@angular/core';
import { HttpClientModule, HttpClient, HttpHeaders } from  '@angular/common/http'

@Component({
  selector: 'app-landing-components',
  templateUrl: './landing-components.component.html',
  styleUrls: ['./landing-components.component.css']
})
export class LandingComponentsComponent implements OnInit {

  constructor(private  httpClient:HttpClient) {}

  ngOnInit(): void {}

  anonymizeFile(){
    let resp_upload =this.httpClient.get<any>('https://6mbog7gt9b.execute-api.eu-central-1.amazonaws.com/v1/download-function',{ observe: 'response'}).subscribe((val) => {
      console.log(val);
      console.log(val.body)

    })
  

  
  

  
}
}
