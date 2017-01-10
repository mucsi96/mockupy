const fs = require('fs');
const path = require('path');
const phantomjs = require('phantomjs-prebuilt');


module.exports = function (input, format) {
  const program = phantomjs.exec(__dirname + '/phantom-script.js', input, format);
  program.stdout.pipe(process.stdout)
  program.stderr.pipe(process.stderr)
  program.on('exit', code => {})
}
