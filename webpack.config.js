const path = require("path");

module.exports = {
    entry: "./assets/js/app.js",
    output: {
        path: path.resolve("./dist"),
        filename: "bundle.js",
    },
};
