import nodeResolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import replace from '@rollup/plugin-replace';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  context: 'this',
  external: Object.keys(pkg.peerDependencies || {}).concat('react-dom'),
  output: {
    format: 'umd',
    exports: 'named',
    name: 'ReactSingletonHook',
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM'
    }
  },
  plugins: [
    nodeResolve(),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
      preventAssignment: true,
    }),
    commonjs({
    })
  ]
};

if (env === 'production') {
  config.plugins.push(
    terser({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false
      }
    })
  );
}

export default config;
