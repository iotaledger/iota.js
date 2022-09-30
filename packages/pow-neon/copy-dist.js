const fs = require("fs");

try {
    fs.mkdirSync("./dist/native", { recursive: true });
} catch (err) {}
fs.copyFileSync("./native/index.node", "./dist/native/_index_.node");
