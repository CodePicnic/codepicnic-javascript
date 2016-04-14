var assign = require('lodash-compat/object/assign'),
    pick = require('lodash-compat/object/pick'),
    map = require('lodash-compat/collection/map'),
    config = require('./config'),
    utils = require('./utils'),
    request = require('./request');

var ATTRIBUTES_WHITELIST = [
      'customImage', 'containerSize', 'containerType', 'title', 'hostname', 'currentMode'
    ];

function Console(attributes) {
  this.attributes = assign({}, attributes);
}

Console.prototype.set = function set(name, value) {
  this.attributes[name] = value;
};

Console.prototype.get = function set(name) {
  return this.attributes[name];
};

Console.prototype.save = function save() {
  var self = this,
      requestBody = utils.underscoreAttributes(pick(this.attributes, ATTRIBUTES_WHITELIST));

  if (this.get('containerName')) {
    return utils.promiseSuccess(this);
  }

  return request.post('/consoles.json', { console: requestBody, bite: requestBody }).then(function(response) {
    self.set('containerName', response.body.container_name);
    self.set('embedURL', response.body.url);

    return self;
  });
};

Console.prototype.start = function start() {
  return request.post('/consoles/' + this.get('containerName') + '/start.json');
};

Console.prototype.stop = function stop() {
  return request.post('/consoles/' + this.get('containerName') + '/stop.json');
};

Console.prototype.restart = function restart() {
  return request.post('/consoles/' + this.get('containerName') + '/restart.json');
};

Console.prototype.exec = function exec() {
  return request.post('/consoles/' + this.get('containerName') + '/exec.json', { commands: [].slice.call(arguments, 0) }).then(function(response) {
    return response.body;
  });
};

Console.build = function build(attributes) {
  return new Console(attributes);
};

Console.all = function all() {
  return request.get('/consoles.json').then(function(response) {
    return map(response.body.consoles, Console.build);
  });
};

module.exports = Console;