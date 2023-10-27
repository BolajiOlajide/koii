import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';

import pkg from './package.json' assert { type: 'json' };

const extensions = ['.ts'];

const config = {
  input: 'src/index.ts',
  plugins: [
    nodeResolve({ extensions, browser: false }),
    typescript(),
    commonjs(),
    babel({
      extensions,
      babelHelpers: 'bundled',
      exclude: 'node_modules/**'
    }),
    terser()
  ],
  external: ['express', 'ansi-regex', 'easy-table', 'chalk'],
  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'auto',
      sourcemap: true
    },
    {
      file: pkg.module,
      format: 'es',
      sourcemap: true
    }
  ]
};

export default config;
