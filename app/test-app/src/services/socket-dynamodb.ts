import Socket = SocketIOClient.Socket;
import {Observable, Observer} from 'rxjs';
import * as io from 'socket.io-client';

export interface InsertedItem {
  eventName: EventName;
  Keys: any;
  NewImage: any;
}

export interface ModifiedItem {
  eventName: EventName;
  Keys: any;
  OldImage: any;
  NewImage: any;
}

export interface DeletedItem {
  eventName: EventName;
  Keys: any;
}

export interface InitItems {
  eventName: EventName;
  Items: Array<any>;
}

export enum EventName
{
  INIT = <any> 'INIT',
  INSERT = <any>'INSERT',
  MODIFY = <any>'MODIFY',
  REMOVE = <any>'REMOVE',
}

export class SocketDynamodb {

  private socket: Socket;
  private url: string;
  private observable: Observable<any>;
  private allowedEventNames: EventName[] = [EventName.INSERT, EventName.MODIFY, EventName.REMOVE, EventName.INIT];
  private shouldSimplifyItem = true;
  private shouldAccumulateToList = true;


  constructor(tableName, serverDomain='') {
    this.url = `${serverDomain}/${tableName}`;
    this.socket = io(this.url);
  }

  get obs() {
    if (!this.observable) {
      this.observable = Observable.create((observer: Observer<any>) => {
        this.socket.on('message', data => {
          console.log('on message');
          observer.next(data);
        });
        this.socket.on('init-success', data => {
          console.log('init-success');
          observer.next(data);
        });
        this.socket.on('init-error', err => {
          console.log('on init-error', console.log(err));
          observer.error(err);
        });
      });
    }
    return this.observable.filter(sub => !!sub);
  }

  notSimplifyItem() {
    this.shouldSimplifyItem = false;
    return this;
  }

  simplifyItem() {
    this.shouldSimplifyItem = true;
    return this;
  }

  onlyAllowEventNames(...eventNames: EventName[]) {
    this.allowedEventNames = eventNames.slice();
    return this;
  }

  toObservable(): Observable<any> {
    let observable = this.obs.filter(record => {
      return (record && record.eventName === undefined) || this.allowedEventNames.indexOf(record.eventName) >= 0;
    });

    if (this.shouldSimplifyItem) {
      observable = observable.map(SocketDynamodb.simplifyRecordsMapper);
    }
    return observable;
  }

  bindToListModel(list: Array<any>): void {
    this.toObservable().subscribe(record => {
      console.log('eventName', record.eventName);
      console.log(record);
      switch (record.eventName) {
        case EventName.INIT:
          this.replaceArray(list, record.Items);
        case EventName.INSERT:
          list.push(record.NewImage);
        // case EventName.REMOVE:
        //   list.map
      }
    })
  }

  private replaceArray(oldArray: Array<any>, newArray: Array<any>) {
    console.log('oldArray', oldArray);
    console.log('newArray', newArray);
    for (let i = 0; i < oldArray.length; i++) {
      oldArray.pop();
    }
    for(let i = 0; i < newArray.length; i++) {
      oldArray.push(newArray[i]);
    }
  }


  private static simplifyRecordsMapper(record): InsertedItem | ModifiedItem | DeletedItem | InitItems {
    console.log(record.eventName);
    switch (record.eventName) {
      case 'INSERT':
        return {eventName: record.eventName, Keys: record.dynamodb.Keys, NewImage: record.dynamodb.NewImage};
      case 'MODIFY':
        return {eventName: record.eventName, Keys: record.dynamodb.Keys, NewImage: record.dynamodb.NewImage, OldImage: record.dynamodb.OldImage};
      case 'REMOVE':
        return {eventName: record.eventName, Keys: record.dynamodb.Keys};
      // undefined which is 'INIT'
      default:
        return {eventName: EventName.INIT, Items: record};
    }
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
