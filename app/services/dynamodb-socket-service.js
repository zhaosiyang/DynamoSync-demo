const socketio = require('socket.io');
import {unmarshalItem} from 'dynamodb-marshaler';
import * as AWS from 'aws-sdk';
// TODO change region configurable
const dynamodb = new AWS.DynamoDB({region: 'us-west-2'});

export class DynamodbSocketService {

  static configIO(server) {
    this.io = socketio(server);
  }

  static _registerTableName(tableName) {
    this.tableToEmitter = this.tableToEmitter || {};
    this.tableToEmitter[tableName] = this._createEmitter(tableName);
    this.tableToEmitter[tableName].on('connection', socket => {
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
    return this._IO().of('/' + tableName);
  }

  static _isTableRegistered(tableName) {
    return this.tableToEmitter && !!this.tableToEmitter[tableName];
  }

  static emitPayload(tableName, payload) {
    if (this._isTableRegistered(tableName)) {
      this._registerTableName(tableName);
    }
    this.tableToEmitter[tableName].emit('message', payload);
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
      this.emitPayload(req.body.tableName, record);
    });
    res.end();
  }

}