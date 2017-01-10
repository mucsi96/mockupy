const system = require('system');
const fs = require('fs');
const page = require('webpage').create();
const script = require('./browser-script');
const html = system.args[1];
const svg = system.args[2] === 'svg';

page.setContent(html, '');
if (svg) {
  page.evaluate(require('./svg-renderer'));
} else {
  page.injectJs('./node_modules/jspdf/dist/jspdf.min.js');
  page.evaluate(require('./pdf-renderer'));
}
const result = page.evaluate(script);
console.log(result);
phantom.exit();
