var express = require('express');
import {DynamodbSocketService} from '../services/dynamodb-socket-service';
var router = express.Router();

/* GET home page. */
router.post('/', function(req, res, next) {
  console.log('got /');
  console.log(req.body);
  const tableName = req.body.tableName;
  DynamodbSocketService.emitPayload(tableName, req.body.event);
});

module.exports = router;
