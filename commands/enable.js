"use strict";

var request = require('request');
var cli = require('heroku-cli-util');

module.exports = function(topic, baseUrl) {
  return {
    topic: topic,
    command: 'enable',
    description: 'enable CDN for your app',
    help: `
  enable CDN for your app.

Example:

  $ heroku cdn:enable
`,
    needsAuth: true,
    needsApp: true,
    run: function (context) {
      request.patch({
        url: `${baseUrl}/apps/${context.app}/cdn`,
        json: true,
        body: {
          'enabled': true
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
          cli.error(`Problem provisioning your CDN.: ${err.message}`);
        }

        if(res.statusCode == 200) {
          cli.log(`CDN is being provisioned. Run \`heroku ${topic}:wait\` to check the status. Set your DNS CNAME to '${body.hostname}'`);
        } else {
          cli.error(`Problem provisioning your CDN. ${res.statusCode}`);
        }
      }
    }
  };
}
