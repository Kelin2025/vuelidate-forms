import babel from 'rollup-plugin-babel';
import cjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'src/index.js',
  plugins: [
    babel(),
    cjs(),
    resolve()
  ],
  format: 'es',
  sourceMap: true,
  moduleName: 'apicase',
  dest: 'dist/index.js'
};
