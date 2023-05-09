const resolve = require('@rollup/plugin-node-resolve')
const commonjs = require('@rollup/plugin-commonjs')
const terser = require('@rollup/plugin-terser')
const json = require('@rollup/plugin-json')

module.exports = {
  input: './app.js',
  output: {
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    resolve({ preferBuiltins: true, jail: '/src' }),
    commonjs(),
    json(),
    terser()
  ],
  external: ['express'],
  onwarn: (warning, warn) => {
    if (warning.code === 'CIRCULAR_DEPENDENCY') return
    warn(warning)
  }
}
