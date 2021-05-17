import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';

const plugins = [
    replace({
        preventAssignment: true
    }),
    commonjs(),
    resolve({
        preferBuiltins: true
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index.js`,
    output: {
        file: `dist/pow-node${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'cjs',
        name: 'PowNode',
        compact: process.env.MINIFY,
        exports: "auto",
        globals: {
            "@iota/iota.js": "@iota/iota.js"
        }
    },
    external: [
        "@iota/iota.js"
    ],
    plugins
}