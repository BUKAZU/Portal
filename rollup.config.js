import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import css from 'rollup-plugin-css-porter';
import dev from 'rollup-plugin-dev'

export default {
  input: 'src/index.js',
  output: {
    file: 'build/static/main.js',
    format: 'iife',
  },
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
    }),
    css(),
    process.env.NODE_ENV === 'production' && uglify(),
    dev({
      dirs: ['build']
    })
  ],
};