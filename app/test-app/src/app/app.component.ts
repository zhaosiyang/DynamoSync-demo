import { Component } from '@angular/core';
import {SocketDynamodb, EventName} from '../services/socket-dynamodb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private messages: Array<string> = [];
  private serverDomain = 'http://54.213.212.103:3000';
  private title = 'hello';

  ngOnInit() {
    const sd = new SocketDynamodb('MusicLibraryTest', this.serverDomain).toObservable();
    sd.subscribe(data => {
      console.log(data);
      // this.messages.push(data.SongTitle);
    })
  }

}
