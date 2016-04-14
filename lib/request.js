require('es6-promise').polyfill();

var superagent = require('superagent-use'),
    promise = require('superagent-promise-plugin'),
    prefix = require('superagent-prefix'),
    config = require('./config'),
    utils = require('./utils');

var OAUTH_HOST = 'https://codepicnic.com',
    API_HOST = 'https://codepicnic.com/api';

superagent.use(promise);

function prepare(request) {
  request.set('Content-Type', 'application/json');

  if (config.accessToken) {
    request.set('Authorization', 'Bearer ' + config.accessToken);
  }
  else {
    if (config.clientId && config.clientSecret) {
      return auth(config.clientId, config.clientSecret).then(function() {
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
  var tokenRequestBody = {
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret
  };

  config.clientId = clientId;
  config.clientSecret = clientSecret;

  return superagent.post('/oauth/token').use(prefix(OAUTH_HOST)).send(tokenRequestBody).then(authSuccess);
}

function post(path, body) {
  return prepare(superagent.post(path).use(prefix(API_HOST)).send(body));
}

function get(path) {
  return prepare(superagent.get(path).use(prefix(API_HOST)));
}

module.exports = {
  auth: auth,
  get: get,
  post: post
};