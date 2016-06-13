var mocha = require('mocha'),
    assert = require('assert');

var CodePicnic = require('../lib');

describe('CodePicnic JavaScript SDK', function() {
  this.timeout(10000);
  var myConsole;

  before(function(done) {
    CodePicnic.initialize(process.env.CLIENT_ID, process.env.CLIENT_SECRET).then(function() {
      done();
    });
  });

  it('creates new console', function(done) {
    var newConsole = new CodePicnic.Console({
      containerType: 'bash',
      title: 'My New Bash Console'
    });

    newConsole.save().then(function(savedConsole) {
      myConsole = newConsole;

      assert(newConsole.get('containerName'));
      done();
    });
  });

  it('executes commands inside a console', function(done) {
    myConsole.exec('ls -la /').then(function(data) {
      assert(Object.keys(data)[0] === 'ls -la /');
      done();
    });
  });

  it('lists all consoles', function(done) {
    CodePicnic.Console.all().then(function(consoles) {
      assert(consoles.length > 0);
      done();
    });
  });

  it('gets a console', function(done) {
    CodePicnic.Console.get(myConsole.get('containerName')).then(function(console) {
      assert(console);
      done();
    });
  });
});