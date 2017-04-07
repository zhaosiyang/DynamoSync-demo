import { Component } from '@angular/core';
import {SocketDynamodb, EventName} from '../services/socket-dynamodb';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private items = [6,7,8];
  private serverDomain = 'http://54.213.212.103:3000';
  private title = 'hello';


  ngOnInit() {
    new SocketDynamodb('MusicLibraryTest', this.serverDomain).bindToListModel(this.items);
  }

}
