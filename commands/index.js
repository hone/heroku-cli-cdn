module.exports = function(topic, description) {
  return {
    topic: topic,
    needsAuth: true,
    needsApp: true,
    help: 'managing the Heroku CDN',
    run: function (context) {
      console.log(context);
    }
  };
}
