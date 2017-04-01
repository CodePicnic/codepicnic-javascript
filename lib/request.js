require('es6-promise').polyfill();

var superagent = require('superagent-use')(require('superagent')),
    promise = require('superagent-promise-plugin'),
    prefix = require('superagent-prefix'),
    forEach = require('lodash-compat/collection/forEach'),
    config = require('./config'),
    utils = require('./utils');

superagent.use(promise);

function prepare(request, sendContentType) {
  sendContentType = sendContentType === undefined ? true : sendContentType;

  if (sendContentType) {
    request.set('Content-Type', 'application/json');
  }

  if (config.accessToken) {
    request.set('Authorization', 'Bearer ' + config.accessToken);
  }
  else {
    if (config.clientId && config.clientSecret) {
      return auth(config.clientId, config.clientSecret).then(function() {
        request.set('Authorization', 'Bearer ' + config.accessToken);

        return request;
      });
    }
    else {
      return utils.promiseError('No client id/secret provided');
    }
  }

  return request;
}

function authSuccess(response) {
  var body = response.body,
      data = {
        accessToken: body.access_token,
        refreshTokenAt: (body.created_at + body.expires_in) * 1000
      };

  config.accessToken = data.accessToken;
  config.refreshTokenAt = data.refreshTokenAt;

  return data;
}

function auth(clientId, clientSecret) {
  var request = superagent.post('/oauth/token').use(prefix(config.OAUTH_HOST)),
      tokenRequestBody = {
        grant_type: 'client_credentials',
        client_id: clientId,
        client_secret: clientSecret
      };

  config.clientId = clientId;
  config.clientSecret = clientSecret;

  request.set('Content-Type', 'application/json');

  return request.send(tokenRequestBody).then(authSuccess);
}

function post(path, body) {
  return prepare(superagent.post(path).use(prefix(config.API_HOST)).send(body));
}

function postFile(path, files, params) {
  var request = superagent.post(path).use(prefix(config.API_HOST));

  forEach(params, function(value, name) {
    request = request.field(name, value);
  });

  forEach(files, function(value, name) {
    if (typeof value === 'string') {
      request = request.attach(name, value);
    }
    else {
      request = request.attach(name, value, value.path || value.name);
    }
  });

  return prepare(request, false);
}

function get(path) {
  return prepare(superagent.get(path).use(prefix(config.API_HOST)));
}

module.exports = {
  auth: auth,
  get: get,
  post: post,
  postFile: postFile
};