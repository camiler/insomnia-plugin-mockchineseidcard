import { uglify } from 'rollup-plugin-uglify'

export default {
  input: 'src.js',
  output: {
    file: 'index.js',
    format: 'cjs',
    plugins: [uglify()],
  }
}