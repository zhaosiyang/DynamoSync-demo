var express = require('express');
var router = express.Router();
var AWS = require('aws-sdk');
var dynamodb = new AWS.DynamoDB({region: 'us-west-2'});

/* GET users listing. */
router.post('/', function(req, res, next) {
  var params = {
    Item: {
      id: {
        S: (Math.random() * 100000000000000000).toString()
      },
      "ShopItem": {
        S: req.body.contents
      },
      "CreatedAt": {
        S: Date.now().toString()
      },
      "Finished": {
        N: '0'
      }
    },
    TableName: "ShoppingList"
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

router.delete('/:id', function (req, res, next) {
  var params = {
    Key: {
      "id": {
        S: req.params.id
      }
    },
    TableName: "ShoppingList"
  };
  dynamodb.deleteItem(params, function (err, data) {
    if (err) {
      console.error(err);
      res.status(500).end();
    }
    else {
      res.end();
    }
  })
});

router.put('/:id/finish', function (req, res, next) {
  var params = {
    ExpressionAttributeNames: {
      "#F": "Finished"
    },
    ExpressionAttributeValues: {
      ":t": {
        N: "1"
      }
    },
    Key: {
      "id": {
        S: req.params.id
      }
    },
    TableName: "ShoppingList",
    UpdateExpression: "SET #F = :t"
  };
  dynamodb.updateItem(params, function (err, data) {
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
