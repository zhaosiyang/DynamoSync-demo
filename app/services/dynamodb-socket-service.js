const socketio = require('socket.io');
import {unmarshalItem} from 'dynamodb-marshaler';

export class DynamodbSocketService {

  static _registerTableName(tableName) {
    DynamodbSocketService.tableToEmitter = DynamodbSocketService.tableToEmitter || {};
    if (DynamodbSocketService[tableName]) {
      return;
    }
    DynamodbSocketService.tableToEmitter[tableName] = this._createEmitter(tableName);
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

  static middleware(req, res, next) {
    console.log(req.body.Records);
    req.body.Records.map(unmarshalItem).forEach(record => {
      DynamodbSocketService.emitPayload(req.body.tableName, record);
    });
    res.end();
  }

}
