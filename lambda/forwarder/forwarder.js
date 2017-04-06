const request = require('request');

exports.handler = function(e, ctx, cb) {
  request.post({url: process.env.URL, form: {event:e}}, function(err,httpResponse,body){
    cb(err, true);
  })
};