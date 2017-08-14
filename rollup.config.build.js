import cjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import resolve from 'rollup-plugin-node-resolve';
import { minify } from 'uglify-es';

export default {
  entry: 'src/index.js',
  plugins: [
    cjs(),
    babel(),
    resolve(),
    uglify({}, minify)
  ],
  format: 'es',
  sourceMap: true,
  moduleName: 'vuelidate-forms',
  dest: 'dist/index.js'
};
