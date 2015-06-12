'use strict';

var pkg = require('./package.json');

const TOPIC = 'cdn';
const BASE_URL = 'https://synapse-api.herokuapp.com';

exports.topic = {
  name: TOPIC,
  description: pkg.description,
};

exports.commands = [
  require('./commands/index.js')(TOPIC, pkg.description),
  require('./commands/enable.js')(TOPIC, BASE_URL)
];
