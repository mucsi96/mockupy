#!/usr/bin/env node

const argv = require('minimist')(process.argv.slice(2));
const mockupy = require('../src');

if (argv.help) {
  return showHelp();
}

argv.format = (argv.format || argv.f || 'SVG').toLowerCase();

function showHelp () {
  console.log(`Usage: input.html > mockupy [options]

Options:
  -f, --format  Output format (SVG, PDF)

Examples:
  cat mockup.html | mockupy > mockup.svg
  cat mockup.html | mockupy --format=pdf > mockup.pdf
`);
}

let content = '';
process.stdin.resume();
process.stdin.on('data', function(buf) { content += buf.toString(); });
process.stdin.on('end', function() {
    mockupy(content, argv.format);
});
