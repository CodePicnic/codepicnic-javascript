var mocha = require('mocha'),
    assert = require('assert'),
    CodePicnic = require('../lib');

describe('CodePicnic JavaScript SDK', function() {
  this.timeout(10000);
  var myConsole;

  before(function(done) {
    CodePicnic.initialize(process.env.CLIENT_ID, process.env.CLIENT_SECRET).then(function() {
      done();
    }, console.error.bind(console));
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
    myConsole.exec('echo "Hello World"').then(function(data) {
      assert(data['echo "Hello World"'] == 'Hello World\n');
      done();
    });
  });

  it('upload files to console', function(done) {
    myConsole.uploadFile('./app/test.js', __dirname + '/index.js').then(function(data) {
      assert(data.status === 'success');
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