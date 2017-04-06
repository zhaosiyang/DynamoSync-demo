import { Component } from '@angular/core';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'app works!';
  private messages: Array<string> = ['test1', 'test2'];
  private serverDomain = 'http://54.213.212.103:3000';
  private socket;

  ngOnInit() {
    // const tableName = 'MusicLibraryTest';
    // const serverUrl = `${this.serverDomain}/${tableName}`;
    // console.log(serverUrl);
    // this.socket = io(serverUrl);
    //
    // this.socket.on('message', data => {
    //   console.log('got info');
    //   this.messages.push(data);
    // });


    var socket = io('http://54.213.212.103:3000');
    socket.on('connect', function(){
      console.log('connected');
    });
    socket.on('message', function(data){
      console.log('got message');
    });
    socket.on('disconnect', function(){});

  }

}
