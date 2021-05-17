import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import { terser } from 'rollup-plugin-terser';
import nativePlugin from 'rollup-plugin-natives';

const plugins = [
    replace({
        preventAssignment: true
    }),
    commonjs(),
    resolve({
        preferBuiltins: true
    }),
    nativePlugin({
        copyTo: 'dist/native',
        destDir: './native',
        dlopen: false,
        map: (modulePath) => 'index.node',
        sourcemap: true
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index.js`,
    output: {
        file: `dist/pow-neon${process.env.MINIFY ? '.min' : ''}.js`,
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