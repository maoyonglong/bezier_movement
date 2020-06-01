import babel from 'rollup-plugin-babel'
import {uglify} from 'rollup-plugin-uglify'

const isProd = process.env.NODE_ENV.trim() === 'production'
const name = 'BezierMovement'
const dist = 'dist'
const filename = 'bezier-movement'

let output = {
  file: `${dist}/${filename}.js`,
  format: 'umd',
  name
}

let plugins = [
  babel({
    runtimeHelpers: true,
    exclude: 'node_modules/**'
  })
]

if (isProd) {
  output = [
    {
      file: `${dist}/${filename}-iife.min.js`,
      format: 'iife',
      name
    },
    {
      file: `${dist}/${filename}-umd.min.js`,
      format: 'umd',
      name
    },
    {
      file: `${dist}/${filename}-cjs.min.js`,
      format: 'cjs'
    },
    {
      file: `${dist}/${filename}-amd.min.js`,
      format: 'amd'
    }
  ],
  plugins.push(uglify())
}

export default {
  input: 'src/index.js',
  output,
  plugins
}
