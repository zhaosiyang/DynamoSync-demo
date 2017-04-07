var express = require('express');
import {DynamoSync} from '../services/dynamodb-socket-service';
var router = express.Router();

router.post('/', DynamoSync.middleware);

module.exports = router;
