"use strict";

var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
const Autoprefixer = require('autoprefixer');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');
var STATIC_SRC = require("./f2eci")["static-src"];
var DIST_PATH = require('./f2eci').dist;
var HTML_PATH = require('./f2eci').output;
var env = require("./f2eci").env;
var PUBLIC_PATH = require('./f2eci').urlPrefix + STATIC_SRC + '/';

if(process.env.NODE_ENV === 'dev'){
    env = 'dev';
}

var plugins = [
    new CleanWebpackPlugin(['dist'], {
        root: path.join(__dirname),
        verbose: true,
        dry: false
    }),
    new HtmlWebpackPlugin({
        filename: path.join(__dirname, DIST_PATH , '/index.html'),
        template: path.join(__dirname, HTML_PATH + '/index.html'),
        inject: true
    }),
    new ExtractTextPlugin({
        filename: env === 'dev' ? '[name].css' : '[name].[chunkhash:7].css',
        disable: false,
        allChunks: true
    }),
    new webpack.LoaderOptionsPlugin({
        options: {
            postcss: [
                Autoprefixer({
                    browsers: ['> 1%','ios 8']
                })
            ]
        }
    }),
    new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        // filename: "vendor.js"
        // (给 chunk 一个不同的名字)
        
        minChunks: Infinity,
        // 随着 入口chunk 越来越多，这个配置保证没其它的模块会打包进 公共chunk
    })
];

if (env == "product") {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }));
    // 参考 https://doc.webpack-china.org/guides/migrating/#uglifyjsplugin-sourcemap
    plugins.push(new webpack.optimize.UglifyJsPlugin({
        // sourceMap: true
        compress: {
            warnings: false
        }
    }));
    // 参考 https://doc.webpack-china.org/guides/migrating/#uglifyjsplugin-loaders
    plugins.push(new webpack.LoaderOptionsPlugin({
        minimize: true
    }));
}

var cssOption = {
    use: [
        'css-loader',
        'postcss-loader'
    ],
    fallback: 'vue-style-loader'
};
var lessOption = {
    use: [
        'css-loader',
        'postcss-loader',
        'less-loader'
    ],
    fallback: 'vue-style-loader'
};
var vueloadRule = {};
if (env == "dev") {
    plugins.push(new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('development')
        }
    }));
    vueloadRule = {
        test: /\.vue$/,
        loader: 'vue-loader',
        // exclude: /node_modules/,
        options: {
            loaders: {
                'css': "vue-style-loader!css-loader!postcss-loader",
                'less': "vue-style-loader!css-loader!postcss-loader!less-loader"
            }
        }
    };
} else {
    vueloadRule = {
        test: /\.vue$/,
        loader: 'vue-loader',
        // exclude: /node_modules/,
        options: {
            loaders: {
                'css': ExtractTextPlugin.extract(cssOption),
                'less': ExtractTextPlugin.extract(lessOption)
            }
        }
    };
}
module.exports = {
    entry: {
        'index': ['./src/index/index.js'],
        'vendor': ["vue", "vuex", "element-ui"],
    },
    output: {
        filename: env === 'dev' ? '[name].js' : '[name].[chunkhash:7].js',
        path: path.join(__dirname, DIST_PATH, STATIC_SRC),
        publicPath: PUBLIC_PATH,
        chunkFilename: '[name].[chunkhash:7].js',
        sourceMapFilename: '[name].map'
    },
    devtool: 'inline-source-map',
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.es6', '.json', '.jsx', '.vue']
    },
    module: {
        rules: [
            vueloadRule,
            {
                test: /\.(es6|js)$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        cacheDirectory: env == "dev"
                    }
                }],
                exclude: /node_modules/
            }, {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(cssOption)
            }, {
                test: /\.woff|ttf|woff2|eot$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 100000
                    }
                }]
            }, {
                test: /\.less$/,
                use: ExtractTextPlugin.extract(lessOption)
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 25000
                    }
                }]
            }
        ]
    },
    target: "web",
    plugins: plugins,
    devServer: {
        contentBase: HTML_PATH,
        historyApiFallback: false,
        hot: true,
        port: 1111,
        disableHostCheck: true,  // 失能域名检查
        publicPath: PUBLIC_PATH,
        noInfo: false,
        compress: true // 开启GZIP,dev的时候感觉快一点
    }
};
