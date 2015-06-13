"use strict";

var request = require('request')
var cli = require('heroku-cli-util');

module.exports = function(topic, baseUrl) {
  return {
    topic: topic,
    command: 'info',
    description: 'get the configuration for your CDN',
    help: `
  get the configuration for your CDN

Example:

  $ heroku cdn:info
`,
    needsAuth: true,
    needsApp: true,
    run: function (context) {
      request.get({
        url: `${baseUrl}/apps/${context.app}/cdn`,
        json: true,
        auth: {
          username: '',
          password: context.auth.password,
          sendImmediately: true
        }
      }, onResponse);
      
      function onResponse(err, res, body) {
        if (err) {
          throw err;
          cli.error(`Problem fetching your CDN info: ${err.message}`);
        }

        if(res.statusCode == 200) {
          for(var key in body) {
            cli.log(`${key}: ${body[key]}`);
          }
        } else {
          cli.error(`Problem fetching your CDN info. ${res.statusCode}`);
        }
      }
    }
  };
}

