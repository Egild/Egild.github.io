'use strict';

const MODE = 'dev'; // 'dev' || 'prod' || 'example' expects file like .dev.env exist in root folder

const pathToEnvFile = '.' + MODE + '.env';
const systemEnv = require('dotenv').config({path: pathToEnvFile}).parsed; //https://github.com/motdotla/dotenv
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin'); //use html template for index file
const Dotenv = require('dotenv-webpack'); //for env variables be accessible inside controllers
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = (env) => {
    return {
        entry: {
            'application': path.resolve(__dirname, process.env.frontendSourcePath) + '/application.js',
            another: path.resolve(__dirname, process.env.frontendSourcePath) + '/another-module.js'
        },
        output: {
            filename: 'javascripts/[name].bundle.js',
            path: path.resolve(__dirname, process.env.frontendDestinationPath),
            publicPath: process.env.frontendProtocol +'://' + process.env.frontendHost + ':' + process.env.frontendPort +'/'
        },
        watchOptions: {
            aggregateTimeout: 300
        },
        plugins: [
            new Dotenv({
                path: pathToEnvFile,
                systemvars: true
            }),
            new HTMLWebpackPlugin({
                title: 'Test project',
                template: path.resolve(__dirname, process.env.frontendSourcePath) + '/index.html',
                baseUrl: process.env.frontendProtocol +'://' + process.env.frontendHost + ':' + process.env.frontendPort,
                faviconUrl: 'images/favicon.ico'
            }),
            new webpack.optimize.CommonsChunkPlugin({
                name: 'common' // Specify the common bundle's name.
            }),
            new ExtractTextPlugin({
                filename: (getPath) => {
                    return getPath('stylesheets/[name].css').replace('stylesheets/javascripts', 'stylesheets');
                }
            }),
            new webpack.ProvidePlugin({
                'Promise': 'es6-promise',
                'fetch': 'imports?this=>global!exports?global.fetch!whatwg-fetch'
            }),
            new OpenBrowserPlugin({
                url: process.env.frontendProtocol +'://' + process.env.frontendHost + ':' + process.env.frontendPort
            })
        ],
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader',
                    options: {
                        loaders: {
                            js: 'babel-loader',
                            scss: 'vue-style-loader!css-loader!sass-loader',
                            sass: 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                        }
                    }
                },
                {
                    test: /\.js$/,
                    loader: 'babel-loader'
                },
                {
                    test: /\.scss$/,
                    use: ExtractTextPlugin.extract([{
                        loader: 'css-loader'
                    }, {
                        loader: 'resolve-url-loader'
                    }, {
                        loader: 'sass-loader'
                    }])
                },
                {
                    test: /\.(png|svg|jpg|gif|ico)$/,
                    loader: 'file-loader?name=images/[name].[ext]'
                },
                {
                    test: /\.(woff2?|eot|ttf|otf|svg)(\?\S*)?$/,
                    exclude: [/images/],
                    loader: 'file-loader?name=fonts/[name].[ext]'
                },
                {
                    test: /\.xml$/,
                    use: [
                        'xml-loader'
                    ]
                }
            ],
            loaders: [
                {
                    test: /\.html$/,
                    loader: 'html-loader'
                }
            ]
        },
        devServer: {
            host: process.env.frontendHost,
            port: process.env.frontendPort,
            historyApiFallback: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.common.js',
            }
        }
    }
};
