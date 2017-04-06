const request = require('request');

exports.handler = function(e, ctx, cb) {
  request(process.env.URL, {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(e)
  }, cb);
};

