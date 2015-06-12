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
      request.post(`${baseUrl}/apps/${context.app}/cdn`, onResponse).auth('', context.auth.password, true);
      
      function onResponse(err, res, body) {
        if(err) {
          throw err;
          cli.error(`Problem provisioning your CDN.: ${err.message}`);
        }

        if(res.statusCode == 200) {
          try {
            var parsedBody = JSON.parse(body)
          }
          catch(e) {
            throw e;
          }
          cli.log(`CDN is being provisioned. Run \`heroku ${topic}:wait\` to check the status. Set your DNS CNAME to '${parsedBody.hostname}'`);
        } else {
          cli.error(`Problem provisioning your CDN. ${res.statusCode}`);
        }
      }
    }
  };
}
