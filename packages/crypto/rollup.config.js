import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const plugins = [
    replace({
        "PlatformHelper.isNodeJs": !process.env.BROWSER,
        "globalThis && globalThis.process && globalThis.process.version": !process.env.BROWSER,
        preventAssignment: true
    }),
    commonjs(),
    resolve({
        browser: process.env.BROWSER
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index${process.env.BROWSER ? "-browser" : "-node"}.js`,
    output: {
        file: `dist/cjs/index${process.env.BROWSER ? "-browser" : "-node"}${process.env.MINIFY ? ".min" : ""}.js`,
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
        ? ["big-integer", "@iota/util.js"]
        : ["big-integer", "crypto", "node-fetch", "@iota/util.js"],
    plugins
};
