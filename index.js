const aws = require('aws-sdk');
const request = require('request');
const url = process.env['url'];

exports.handler = function(event,context) {
  url.split(";").forEach(function(address) {
    request.get(address, (err, response, body) => {
    
      if (response && response.statusCode == 200 && !err) {
        console.log(address+ ' is up');
      }
      else {
        var sns = new aws.SNS();
        console.log(address + ' is down!');
        sns.publish({
          Message: address + ' is down! You should go fix it when you can!',
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
  });
};
