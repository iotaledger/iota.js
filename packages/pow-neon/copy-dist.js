const fs = require("fs");

fs.mkdirSync("./dist/native");
fs.copyFileSync("./native/index.node", "./dist/native/index.node");
