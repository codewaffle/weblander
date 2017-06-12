const concat = require('concat');

require('mkdirp')('.build');

var client_files =  [
  'node_modules/requirejs/require.js', // TODO : use r.js and almond to prepare releases - dynamic loader should only be used for 'dev'
].concat([
  'pixi',
  'p2',
  'phaser'
].map(function(m) {
  return 'node_modules/phaser/build/' + m + '.js';
}));

concat(client_files, '.build/client/lib.js');
