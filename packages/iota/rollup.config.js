import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const plugins = [
    commonjs(),
    resolve()
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index.js`,
    output: {
        file: `dist/cjs/index${process.env.MINIFY ? ".min" : ""}.js`,
        format: "umd",
        name: "Iota",
        compact: process.env.MINIFY,
        globals: {
            "node-fetch": "node-fetch",
            crypto: "crypto",
            "big-integer": "bigInt",
            "@iota/util.js": "IotaUtil",
            "@iota/crypto.js": "IotaCrypto"
        }
    },
    external: ["big-integer", "crypto", "node-fetch", "@iota/util.js", "@iota/crypto.js"],
    plugins
};
