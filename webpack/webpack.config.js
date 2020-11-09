const path = require("path");
const fs = require("fs");
const Webpack = require("webpack");
const CompressionPlugin = require("compression-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");

const PAGES_DIR = `./src/pug/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter((fileName) => fileName.endsWith(".pug"));

module.exports = (env, argv) => {
  const isDev = argv.mode === "development";
  const isProd = argv.mode === "production";

  let config = {
    devtool: isProd ? "" : "eval",
    // Tell webpack the root file of our
    // server application
    entry: "./src/js/index.js",

    // Tell webpack where to put the output file
    // that is generated
    output: {
      filename: "assets/js/common.js",
      path: path.resolve(__dirname, "../dist"),
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
    },
    devServer: {
      contentBase: "../dist",
      compress: true,
      port: 9000,
    },
    watch: isDev,
    watchOptions: {
      ignored: [/node_modules/],
    },
    plugins: [
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: "./assets/css/main.css",
      }),
      new Webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
      }),
      new HtmlWebpackPlugin({
        template: `./src/pug/index.pug`,
        filename: "../dist/index.html",
        minify: false,
        inject: false,
      }),
      ...PAGES.map(
        (page) =>
          new HtmlWebpackPlugin({
            template: `./src/pug/pages/${page}`,
            filename: `../dist/${page.replace(/\.pug/, "/index.html")}`,
            minify: false,
            inject: false,
          })
      ),
    ],
    module: {
      rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader: "css-loader", options: { url: false, sourceMap: true } },
            "sass-loader",
          ],
        },
        {
          test: /\.js?$/,
          loader: "babel-loader",
          exclude: /node_modules/,
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        {
          test: /\.pug$/,
          loader: "pug-loader",
          options: {
            pretty: true,
          },
        },
      ],
    },
  };

  if (isProd) {
    // config.plugins.push(
    //   new CompressionPlugin({
    //     test: /\.js(\?.*)?$/i,
    //   })
    // );
  }

  return config;
};
