const aws = require('aws-sdk');
const request = require('request');
const url = process.env['url'];

exports.handler = function(event,context) {
  request.get(url, (err, response, body) => {
    
    if (response && response.statusCode == 200 && !err) {
      console.log(url+ ' is up');
    }
    else {
      var sns = new aws.SNS();
      console.log(url + ' is down!');
      sns.publish({
        Message: url + ' is down! You should go fix it when you can!',
        TopicArn: process.env['DidItCrashSNSArn']
        }, function(err, data) {
          if (err) {
            console.log(err.stack);
	    context.done(err, 'This function ended in an error!');
	    return;
          }
          console.log(data);
          context.done(null, 'Function successfully terminated!');
      });
    }
  });
};
