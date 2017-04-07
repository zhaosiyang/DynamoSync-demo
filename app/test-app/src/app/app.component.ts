import { Component } from '@angular/core';
import {SocketDynamodb} from '../services/socket-dynamodb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'app works!';
  private messages: Array<string> = [];
  private serverDomain = 'http://54.213.212.103:3000';
  private socket;

  ngOnInit() {
    const sd = new SocketDynamodb('MusicLibraryTest', this.serverDomain).all();
    sd.subscribe(data => {
      console.log(data);
      this.messages.push(data.eventID);
    })
  }

}
