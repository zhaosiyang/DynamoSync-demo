const socketio = require('socket.io');
import {unmarshalItem} from 'dynamodb-marshaler';
import * as AWS from 'aws-sdk';
// TODO change region configurable
const dynamodb = new AWS.DynamoDB({region: 'us-west-2'});

export class DynamodbSocketService {

  static configIO(server) {
    DynamodbSocketService.io = socketio(server);
  }

  static _registerTableName(tableName) {
    DynamodbSocketService.tableToEmitter = DynamodbSocketService.tableToEmitter || {};
    if (DynamodbSocketService[tableName]) {
      return;
    }
    DynamodbSocketService.tableToEmitter[tableName] = this._createEmitter(tableName);
    DynamodbSocketService.tableToEmitter[tableName].on('connection', socket => {
      console.log('some user connected');
      dynamodb.scan({TableName: tableName}, (err, data) => {
        if (err) {
          console.log('init-error', err);
          socket.emit('init-error', err);
        }
        else {
          const items = data.Items.map(unmarshalItem);
          socket.emit('init-success', items);
        }
      });
    });
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
          item.dynamodb[field] = unmarshalItem(item.dynamodb[field]);
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