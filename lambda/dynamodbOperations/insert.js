const AWS = require('aws-sdk');

const dynamodb = new AWS.DynamoDB();

exports.handler = function(e, ctx, cb) {

  const Item = {
    "AlbumTitle": {
      S: "AlbumA"
    },
    "Artist": {
      S: "Jay Chou"
    },
    "SongTitle": {
      S: "Juhuatai"
    }
  };

  const params = {
    Item,
    ConditionExpression: 'attribute_not_exists(SongTitle)',
    ReturnConsumedCapacity: "TOTAL",
    TableName: "MusicLibraryTest"
  };

  dynamodb.putItem(params, function (err, response) {
    console.log('err', err);
    console.log('err', response);
    cb(err, response);
  });
};
