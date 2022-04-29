// just using fs, and path
let fs = require('fs'),
path = require('path');

const exclude = ["node_modules", "link.js"];
const walk = (dir, depth) => {
    fs.readdir(dir, (_e, items) => {
        items.forEach((item) => {
            if (!exclude.includes(item)) {
                let itemPath = path.join(dir, item);
                fs.stat(itemPath, (_e, stats) => {
                    if (stats.isDirectory()) walk(itemPath, depth + 1)
                    else if (stats.isFile()) {
                        fs.readFile(itemPath, 'utf8', (_err, data) => {
                            const relative = depth === 0 ? "./" : "../".repeat(depth);
                            const lines = data.split(/\r?\n/);
                            // logging
                            lines.forEach(line => {
                                if (line.includes("import ") && !line.includes("./")) {
                                    const what = line.slice(line.indexOf("from ") + "from ".length, -1);
                                    const where = "./" + itemPath.slice(itemPath.indexOf("/types/") + "/types/".length);
                                    console.log(`linking ${what} in ${where}`)
                                }
                            })

                            data = data.replace(/from "@iota\/crypto.js"/g, `from "${relative}crypto.js"`);
                            data = data.replace(/from "@iota\/util.js"/g, `from "${relative}util.js"`);
                            data = data.replace(/from "big-integer"/g, `from "${relative}big-int"`);
                            fs.writeFile(itemPath, data, 'utf8', function (err) {
                                if (err) return console.log(err);
                            });
                        });
                    }
                });
            }
        });
    });
};

walk(process.cwd(), 0);

