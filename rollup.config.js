// rollup.config.js
// import { rollup } from 'rollup';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: '.build/client/main.js',
  dest: '.build/client/bundle.js',
  moduleName: 'weblander',
  format: 'iife',
  plugins: [
    resolve({
      module: true, // Default: true

      // use "main" field or index.js, even if it's not an ES6 module
      // (needs to be converted from CommonJS to ES6
      // – see https://github.com/rollup/rollup-plugin-commonjs
      main: true,  // Default: true

      // If true, inspect resolved files to check that they are
      // ES2015 modules
      modulesOnly: true // Default: false
    })
  ],
  external: [
      'p2'
  ]
};