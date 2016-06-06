require('es6-promise').polyfill();

var transform = require('lodash-compat/object/transform'),
    camelize = require('underscore.string/camelize'),
    underscore = require('underscore.string/underscored');

function promiseError(message) {
  var promise = new Promise(function(resolve, reject) {
    reject(new Error(message));
  });

  return promise;
}

function promiseSuccess(message) {
  var promise = new Promise(function(resolve, reject) {
    resolve(message);
  });

  return promise;
}

function camelizeAttributes(attributes) {
  return transform(attributes, function(result, value, key) {
    result[camelize(key)] = value;
  }, {});
}

function underscoreAttributes(attributes) {
  return transform(attributes, function(result, value, key) {
    result[underscore(key)] = value;
  }, {});
}

module.exports = {
  promiseError: promiseError,
  promiseSuccess: promiseSuccess,
  camelizeAttributes: camelizeAttributes,
  underscoreAttributes: underscoreAttributes
};