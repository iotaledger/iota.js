import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const plugins = [
    commonjs(),
    resolve({
        preferBuiltins: true,
        browser: process.env.BROWSER
    })
];

if (process.env.MINIFY) {
    plugins.push(terser());
}

export default {
    input: `./es/index.js`,
    output: {
        file: `dist/cjs/index${process.env.BROWSER ? "-browser" : "-node"}${process.env.MINIFY ? ".min" : ""}.js`,
        format: "umd",
        name: "IotaMqtt",
        compact: process.env.MINIFY,
        globals: {
            "@iota/iota.js": "Iota",
            "@iota/util.js": "IotaUtil",
            mqtt: "mqtt"
        }
    },
    external: ["@iota/iota.js", "@iota/util.js", "mqtt"],
    plugins
};
