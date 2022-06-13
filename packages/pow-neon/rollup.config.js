import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";
import nativePlugin from "rollup-plugin-natives";

const plugins = [
    commonjs(),
    resolve({
        preferBuiltins: true
    }),
    nativePlugin({
        copyTo: "dist/native",
        destDir: "./native",
        dlopen: false,
        map: modulePath => "_index_.node",
        sourcemap: true
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index.js`,
    output: {
        file: `dist/pow-neon${process.env.MINIFY ? ".min" : ""}.js`,
        format: "cjs",
        name: "IotaPowNode",
        compact: process.env.MINIFY,
        exports: "auto",
        globals: {
            "@iota/iota.js": "Iota"
        }
    },
    external: ["@iota/iota.js"],
    plugins
};
