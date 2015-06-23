"use strict";

var request = require('request');
var cli = require('heroku-cli-util');

module.exports = function(topic, baseUrl) {
  return {
    topic: topic,
    command: 'invalidate',
    description: 'invalidate the cache in the CDN',
    help: `
  invalidate the cache in the CDN

Example:

  $ heroku cdn:invalidate
`,
    needsAuth: true,
    needsApp: true,
    run: function (context) {
      request.post({
        url: `${baseUrl}/apps/${context.app}/cdn/invalidate`,
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
          cli.error(`Problem invalidating your CDN.: ${err.message}`);
        }

        if(res.statusCode == 202) {
          cli.log(`CDN has been invalidated.`);
        } else {
          cli.error(`Problem invalidating your CDN. ${res.statusCode}`);
        }
      }
    }
  };
}
