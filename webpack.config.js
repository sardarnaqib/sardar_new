const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

let config = {
    entry: "./assets/js/app.js",
    output: {
        path: path.resolve("./dist"),
        filename: "bundle.js",
    },
    optimization: {
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        minimize: false,
    },
    // plugins: [require("autoprefixer")({})],

    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            ["@babel/preset-env", { targets: "defaults" }],
                        ],
                    },
                },
            },
            {
                test: /\.css$/,
                use: [],
            },
        ],
    },
    // plugins: [].concat(
    //     devMode
    //         ? []
    //         : [
    //               new MiniCssExtractPlugin({
    //                   filename: "[name].css",
    //               }),
    //           ]
    // ),
};

// module.exports = config;
module.exports = (env, argv) => {
    if (argv.mode === "development") {
        config.devtool = "source-map";
        config.module.rules[1].use = [
            "style-loader",
            "css-loader",
            "postcss-loader",
        ];
        config.watch = true;
    }
    if (argv.mode === "production") {
        config.module.rules[1].use = [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "postcss-loader",
        ];
        config.plugins = [
            new MiniCssExtractPlugin({
                filename: "[name].css",
            }),
        ];
    }
    return config;
};
