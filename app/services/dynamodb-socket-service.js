const socketio = require('socket.io');
import {unmarshalItem} from 'dynamodb-marshaler';
import * as AWS from 'aws-sdk';
// TODO change region configurable
const dynamodb = new AWS.DynamoDB({region: 'us-west-2'});

export class DynamodbSocketService {

  static _registerTableName(tableName) {
    DynamodbSocketService.tableToEmitter = DynamodbSocketService.tableToEmitter || {};
    if (DynamodbSocketService[tableName]) {
      return;
    }
    DynamodbSocketService.tableToEmitter[tableName] = this._createEmitter(tableName);
    DynamodbSocketService.tableToEmitter[tableName].on('connection', socket => {
      console.log('some user connected');
      console.log('fetch init data');
      dynamodb.scan({TableName: tableName}, (err, data) => {
        if (err) {
          console.log('init-error', err);
          socket.emit('init-error', err);
        }
        else {
          console.log('fetch init data success', data);
          const items = data.Items.map(unmarshalItem);
          console.log('map init data to items: ', items);
          socket.emit('init-success', items);
        }
      });
    });
  }

  static configIO(server) {
    DynamodbSocketService.io = socketio(server);
  }

  static _IO() {
    if (!DynamodbSocketService.io) {
      throw new Error('Please call configIO at the beginning');
    }
    else {
      return DynamodbSocketService.io;
    }
  }

  static _createEmitter(tableName) {
    return DynamodbSocketService._IO().of('/' + tableName);
  }

  static emitPayload(tableName, payload) {
    if (!DynamodbSocketService.tableToEmitter || !DynamodbSocketService[tableName]) {
      this._registerTableName(tableName);
    }
    DynamodbSocketService.tableToEmitter[tableName].emit('message', payload);
  }

  static _unmarshal(item) {
    if (item.dynamodb) {
      const fields = ['Keys', 'NewImage', 'OldImage'];
      fields.forEach(field => {
        if (item.dynamodb[field]) {
          console.log('original item', item.dynamodb[field]);
          item.dynamodb[field] = unmarshalItem(item.dynamodb[field]);
          console.log('new item', item.dynamodb[field]);
        }
      });
    }
    return item;
  }

  static middleware(req, res, next) {
    console.log('middleware called');
    req.body.Records.map(DynamodbSocketService._unmarshal).forEach(record => {
      console.log('emit payload', record);
      DynamodbSocketService.emitPayload(req.body.tableName, record);
    });
    res.end();
  }

}

// const item = { eventID: '63e13c4461de0e6b943b8d2d7c2c0e3b',
//   eventName: 'INSERT',
//   eventVersion: '1.1',
//   eventSource: 'aws:dynamodb',
//   awsRegion: 'us-west-2',
//   dynamodb:
//     { ApproximateCreationDateTime: 1491525000,
//       Keys: {"Artist": {"S": "artist"}},
//       NewImage: {"Artist": {"S": "artist"}, "SongTitle": {"N": "5"}},
//       SequenceNumber: '22901100000000004359540401',
//       SizeBytes: 34,
//       StreamViewType: 'NEW_AND_OLD_IMAGES' },
//   eventSourceARN: 'arn:aws:dynamodb:us-west-2:113420481216:table/MusicLibraryTest/stream/2017-04-04T00:41:35.492' };
//
// console.log(DynamodbSocketService.unmarshal(item));