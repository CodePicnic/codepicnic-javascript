# CodePicnic JavaScript SDK

JavaScript Client for the CodePicnic's API

## Getting Started

To use this library (and the CodePicnic API) you need to sign up in [codepicnic.com](https://codepicnic.com) and [purchase a paid plan](https://codepicnic.com/pricing).

## Installation

### Node.js:

`npm install codepicnic`

### Browser:

Use the `codepicnic.js` file located in the `dist` folder.

## Usage

### Node.js:

```javascript
var CodePicnic = require('codepicnic');

CodePicnic.initialize('CLIENT_ID', 'CLIENT_SECRET');

var newConsole = new CodePicnic.Console({
  containerType: 'bash',
  title: 'My New Bash Console'
});

newConsole.save().then(function() {
  return newConsole.exec('ls -la /');
}).then(function(data) {
  console.log('Files listed in /', data['ls -la /']);
});
```

### Browser:

```javascript
<script src="codepicnic.js"></script>
<script>
  CodePicnic.initialize('CLIENT_ID', 'CLIENT_SECRET');

  var newConsole = new CodePicnic.Console({
    containerType: 'bash',
    title: 'My New Bash Console'
  });

  newConsole.save().then(function() {
    return newConsole.exec('ls -la /');
  }).then(function(data) {
    console.log('Files listed in /', data['ls -la /']);
  });
</script>
```

`CodePicnic.Console` has the following methods:
* `CodePicnic.Console#save()` (returns a Promise): Create a console with the attributes passed in the initializer (`new CodePicnic.Console(attributes)`). Allowed attributes are defined in [the API's documentation](https://codepicnic.com/docs/api#create) and the attributes' names must be camelCased. **Note:** This method creates a new console unless a `containerName` is passed.
* `CodePicnic.Console#start()` (returns a Promise): Start the server attached to the console.
* `CodePicnic.Console#stop()` (returns a Promise): Stop the server attached to the console.
* `CodePicnic.Console#restart()` (returns a Promise): Restart the server attached to the console.
* `CodePicnic.Console#exec(command1, command2, ...)` (returns a Promise): Execute commands inside the server attached to the console.
* `CodePicnic.Console.all()` (returns a Promise): Return an array of consoles created by the user.

## Testing

Run `npm test`

## Changelog

### 0.0.1

* Initial version

### 0.0.2

* Fixing bug at creating a new `CodePicnic.Console` instance with underscored attributes.

## License

MIT License. Copyright 2016 CodePicnic. http://github.com/CodePicnic

Permission is hereby granted, free of charge, to any
person obtaining a copy of this software and associated
documentation files (the "Software"), to deal in the
Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the
Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice
shall be included in all copies or substantial portions of
the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY
KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE
WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS
OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR
OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.