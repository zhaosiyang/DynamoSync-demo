import Socket = SocketIOClient.Socket;
import {Observable, Observer} from 'rxjs';
import * as io from 'socket.io-client';

export class SocketDynamodb {

  private socket: Socket;
  private url: string;
  private observable: Observable<any>;

  constructor(tableName, serverDomain='') {
    this.url = `${serverDomain}/${tableName}`;
    this.socket = io(this.url);
  }

  get obs() {
    return this.observable || Observable.create((observer: Observer<any>) => {
        this.socket.on('message', data => {
          observer.next(data);
        });
      });
  }

  all(): Observable<any> {
    return this.obs;
  }

  InsertOnly(): Observable<any> {
    return this.obs.filter(data => data.eventName === 'INSERT').map(data => data.NewImage);
  }

}


//
// const tableName = 'MusicLibraryTest';
// const serverUrl = `${this.serverDomain}/${tableName}`;
// console.log(serverUrl);
// this.socket = io(serverUrl);
//
// this.socket.on('message', data => {
//   console.log('got info');
//   this.messages.push(data);
// });
