"use strict";

var request = require('request');
var cli = require('heroku-cli-util');

module.exports = function(topic, baseUrl) {
  return {
    topic: topic,
    command: 'disable',
    description: 'disable CDN for your app',
    help: `
  disable CDN for your app.

Example:

  $ heroku cdn:disable
`,
    needsAuth: true,
    needsApp: true,
    run: function (context) {
      request.patch({
        url: `${baseUrl}/apps/${context.app}/cdn`,
        json: true,
        body: {
          'enabled': false
        },
        auth: {
          username: '',
          password: context.auth.password,
          sendImmediately: true
        }
      }, onResponse);
      
      function onResponse(err, res, body) {
        if (err) {
          throw err;
          cli.error(`Problem deprovisioning your CDN.: ${err.message}`);
        }

        if(res.statusCode == 200 && body.enabled == false) {
          cli.log(`CDN '${body.hostname}' has been disabled.`);
        } else {
          cli.error(`Problem deprovisioning your CDN. ${res.statusCode}`);
        }
      }
    }
  };
}
