const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
require("dotenv").config({ silent: process.env.NODE_ENV === "production" });

const { prodPath, srcPath } = require("./path");
const { selectedPreprocessor } = require("./loader");

module.exports = {
    entry: {
        main: path.resolve(__dirname, srcPath + "/main.ts")
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    output: {
        path: path.resolve(__dirname, prodPath),
        filename: "[name].[hash].js"
    },
    module: {
        rules: [
            {
                test: /\.ts?$/,
                use: "ts-loader"
            },
            {
                test: selectedPreprocessor.fileRegexp,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader"
                    },
                    {
                        loader: "postcss-loader"
                    },
                    {
                        loader: selectedPreprocessor.loaderName
                    }
                ]
            }
        ]
    },
    plugins: [
        new webpack.EnvironmentPlugin({
            HOST_MAIN: "http://localhost:3000",
            HOST_ACCOUNT: "http://localhost:4010",
            HOST_CATALOGUE: "http://localhost:4020",
            HOST_CHECKOUT: "http://localhost:4030"
        }),
        new CleanWebpackPlugin(path.resolve(__dirname, prodPath), {
            root: process.cwd()
        }),
        new MiniCssExtractPlugin({
            filename: "[name].[hash].css"
        }),
        new HtmlWebpackPlugin({
            meta: { viewport: "width=device-width" },
            template: path.resolve(__dirname, srcPath + "/index.html")
        })
    ]
};
