const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

let config = {
    entry: "./assets/js/app.js",
    output: {
        path: path.resolve(__dirname, "build"), // specify the output directory
        filename: "bundle.js", // specify the output filename for the main bundle
        assetModuleFilename: "images/[hash][ext][query]", // specify the output filename pattern for the asset modules
    },
    optimization: {
        minimizer: [new TerserPlugin(), new CssMinimizerPlugin()],
        minimize: true,
    },

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
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset/resource", // use asset/resource instead of asset/inline
                // generator: {
                //     filename: "images/[name][ext][query]", // specify the output filename pattern for the image files
                // },
            },
        ],
    },
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
            new HtmlWebpackPlugin({
                template: "./index.html", // specify the template file for the HTML file
                filename: "index.html", // specify the output filename for the HTML file
            }), // use the HtmlWebpackPlugin to process and inject the HTML file
        ];
    }
    return config;
};
