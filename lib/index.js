var config = require('./config'),
    utils = require('./utils'),
    request = require('./request'),
    Console = require('./console'),
    CodePicnic;

CodePicnic = {
  Console: Console
};

Object.defineProperty(CodePicnic, 'API_HOST', {
  get: function() {
    return config.API_HOST;
  },
  set: function(value) {
    config.API_HOST = value;
  }
});

Object.defineProperty(CodePicnic, 'OAUTH_HOST', {
  get: function() {
    return config.OAUTH_HOST;
  },
  set: function(value) {
    config.OAUTH_HOST = value;
  }
});

function initialize(clientIdOrAccessToken, clientSecret) {
  if (arguments.length === 0) {
    return utils.promiseError('No client id / secret or access token provided');
  }
  else if (arguments.length === 1) {
    if (clientIdOrAccessToken) {
      var data = {
        accessToken: clientIdOrAccessToken,
        refreshTokenAt: Date.now() + 7200000
      };

      config.accessToken = data.accessToken;
      config.refreshTokenAt = data.refreshTokenAt;

      return utils.promiseSuccess(data);

    }
    else {
      return utils.promiseError('No access token provided');
    }
  }

  if (clientIdOrAccessToken && clientSecret) {
    return request.auth(clientIdOrAccessToken, clientSecret);
  }
  else {
    return utils.promiseError('No client id/secret provided');
  }
}

CodePicnic.initialize = initialize;

global.CodePicnic = CodePicnic;
module.exports = CodePicnic;