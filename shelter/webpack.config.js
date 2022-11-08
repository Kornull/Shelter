const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const path = require('path');


const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const filename = (ext) => isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;
const nameImg = () => isDev ? `[name][ext]` : `[name][ext]`;

const plugins = () => {
  const basePlugins = [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './main/index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'pages/pets.html',
      template: './main/pets.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new MiniCssExtractPlugin({
      filename: `./assets/css/${filename('css')}`
    }),
  ]

  return basePlugins;
};

const optimization = () => {
  const configObj = {
    splitChunks: {
      chunks: 'all'
    }
  }
  if (isProd) {
    configObj.minimize = true;
    configObj.minimizer = [
      new CssMinimizerPlugin(),
      new TerserPlugin(),

      // Loss of quality
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.squooshMinify,
        },
      }),
    ]
  }
  console.log(configObj)
  return configObj;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: './main/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: `./assets/js/${filename('js')}`,
    clean: true,
    assetModuleFilename: 'assets/[name][ext]'
  }, devServer: {
    historyApiFallback: true,
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
    hot: true,
    compress: true,
    port: 3000,
  },
  plugins: plugins(),
  devtool: isProd ? false : "source-map",
  optimization: optimization(),
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',

        }
      },
      {
        test: /\.css$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            hmr: isDev
          },
        },
          "css-loader"
        ],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [{
          loader: MiniCssExtractPlugin.loader,

        },
          "css-loader",
          "sass-loader"
        ],
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/img/${nameImg()}`
        }
      },
      {
        test: /\.(svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/icons/${nameImg()}`
        }
      },
      {
        test: /\.(?:woff2|woff|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: `assets/fonts/${nameImg()}`
        }
      },
    ],
  },
};
