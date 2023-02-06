module.exports = {
    plugins: [
        require("autoprefixer")({
            overrideBrowserslist: ["last 1 version", "> 1%", "not dead"],
        }),
    ],
};
