import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const plugins = [
    commonjs(),
    resolve({
        browser: process.env.BROWSER
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index${process.env.BROWSER ? process.env.BUNDLE ?  "-bundle" : "-browser" : "-node"}.js`,
    output: {
        file: `dist/cjs/index${process.env.BROWSER ? process.env.BUNDLE ?  "-bundle" : "-browser" : "-node"}${process.env.MINIFY ? ".min" : ""}.js`,
        format: "umd",
        name: "IotaCrypto",
        compact: process.env.MINIFY,
        globals: {
            "node-fetch": "node-fetch",
            crypto: "crypto",
            "big-integer": "bigInt",
            "@iota/util.js": "IotaUtil"
        }
    },
    external: process.env.BROWSER 
        ? process.env.BUNDLE 
            ?  []
            : "-bundle"["big-integer", "@iota/util.js"]
        : ["big-integer", "crypto", "node-fetch", "@iota/util.js"],
    plugins
};
