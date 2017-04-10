var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({region: 'us-west-2'});

/* GET users listing. */
router.post('/', function(req, res, next) {
  var params = {
    Item: {
      id: {
        S: (Math.random() * 100000000000000000).toString()
      },
      "Name": {
        S: req.body.name
      },
      "CreatedAt": {
        S: Date.now().toString()
      },
      "Contents": {
        S: req.body.contents
      }
    },
    TableName: "Chat"
  };
  dynamodb.putItem(params, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
    else {
      res.end();
    }
  })

});

module.exports = router;
