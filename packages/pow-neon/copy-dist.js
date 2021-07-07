const fs = require("fs");

try {
    fs.mkdirSync("./dist/native");
} catch (err) {}
fs.copyFileSync("./native/index.node", "./dist/native/index.node");
