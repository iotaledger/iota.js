import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import replace from "@rollup/plugin-replace";
import { terser } from "rollup-plugin-terser";

const plugins = [
    replace({
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
        name: "IotaUtil",
        compact: process.env.MINIFY,
        globals: {
            crypto: "crypto",
            "big-integer": "bigInt"
        }
    },
    external: process.env.BROWSER ? ["big-integer"] : ["big-integer", "crypto"],
    plugins
};
