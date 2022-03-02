import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const plugins = [
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
        file: `dist/pow-node${process.env.MINIFY ? ".min" : ""}.js`,
        format: "cjs",
        name: "IotaPowNode",
        compact: process.env.MINIFY,
        exports: "auto",
        globals: {
            "@iota/iota.js": "Iota",
            "@iota/crypto.js": "IotaCrypto"
        }
    },
    external: ["@iota/iota.js", "@iota/crypto.js"],
    plugins
};
