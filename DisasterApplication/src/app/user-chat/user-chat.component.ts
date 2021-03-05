import {Component, Input, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {Observable} from "rxjs";
import { ActivatedRoute } from '@angular/router';
import {switchMap} from "rxjs/operators";


@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {

  heroes$: Observable<any>;
  userName: string;
  title = 'WebSocketChatRoom';
  greetings: string[] = [];
  disabled = true;
  newmessage: string;
  private stompClient = null;
  // Save a reference to the window so we can close it
  private externalWindow = null;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.userName= this.route.snapshot.queryParamMap.get('userName');
    this.connect();
  }

  ngOnDestroy(){
    // Close the window when this component destroyed
    this.externalWindow.close()
  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
    if (connected) {
      this.greetings = [];
    }
  }
  connect() {
    const socket = new SockJS('http://localhost:9902/testchat');
    this.stompClient = Stomp.over(socket);
    const _this = this;
    this.stompClient.connect({}, function (frame) {
      console.log('Connected: ' + frame);
      _this.stompClient.subscribe('/start/initial',
        function(hello){
        console.log(JSON.parse(hello.body));
        _this.showMessage(JSON.parse(hello.body).content);
      });
    });
  }
  sendMessage() {
    this.stompClient.send(
      '/current/resume',
      {},
      JSON.stringify("Message From:"+ this.userName+ ": " +this.newmessage)
    );
    this.newmessage = "";
  }
  showMessage(message) {
    console.log(this.greetings);
    this.greetings.push(message);
  }

}
