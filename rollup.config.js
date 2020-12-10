import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const plugins = [
    commonjs(),
    resolve({
        browser: process.env.BROWSER
    }),
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index${process.env.BROWSER ? '.browser' : '.node'}.js`,
    output: {
        file: `dist/iota${process.env.BROWSER ? '.browser' : ''}${process.env.MINIFY ? '.min' : ''}.js`,
        format: 'umd',
        name: 'Iota',
        compact: process.env.MINIFY,
        globals: {
            "node-fetch": "node-fetch",
            "crypto": "crypto",
            "mqtt": "mqtt"
        }
    },
    external: (process.env.BROWSER ? ["mqtt"] : ["crypto", "node-fetch", "mqtt"]),
    plugins
}