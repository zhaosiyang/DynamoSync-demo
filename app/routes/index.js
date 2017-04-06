var express = require('express');
import {DynamodbSocketService} from '../services/dynamodb-socket-service';
var router = express.Router();

router.post('/', DynamodbSocketService.middleware);

module.exports = router;
