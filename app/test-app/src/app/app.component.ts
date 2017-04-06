import { Component } from '@angular/core';
// import * as io from 'socket.io-client';
import * as io from 'socket.io-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'app works!';
  private messages: Array<string> = ['test1', 'test2'];
  private serverUrl = 'http://localhost:3000';
  private socket;

  ngOnInit() {
    this.socket = io(this.serverUrl);
    console.log('hello');
    this.socket.on('message', data => this.messages.push(data));
  }

}
