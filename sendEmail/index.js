var beautify = require('json-beautify');

var mailer = require('nodemailer-promise');

var sendEmail = mailer.config({
  email: 'zhaosiyang.test@gmail.com',
  password: 'zhaosiyang',
  server: 'smtp.gmail.com'
});


exports.handler = function (e, ctx, callback) {

  let text = `${beautify(e, null, 2, 100)}`;

  const options = {
    subject: 'This is the test',
    senderName: 'Siyang Zhao',
    receiver: 'siyangkernzhao@gmail.com',
    text: text,
  };

  sendEmail(options)
    .then(function(info){callback(null, info)})   // if successful
    .catch(function(err){callback(err, null)});   // if an error occurs
};