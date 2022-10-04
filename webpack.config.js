const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const EslintPlugin = require('eslint-webpack-plugin');
module.exports = {
    mode: 'development',
    target: 'web',
    devtool: 'source-map',
    entry: path.resolve(__dirname, 'src/index.js'),
    devServer: {
        port: 3000,
        open: true,
        compress: true,
        historyApiFallback: true,

        proxy: {
            '/api': 'http://localhost:5000',
        },
    },
    output: {
        clean: true,
        publicPath: '/',
        filename: '[name].bundle.js',
        chunkFilename: '[id].[contenthash].js',
        path: path.resolve(__dirname, '/build'),
        assetModuleFilename: 'assets/images/[name][ext]',
    },
    optimization: {
        splitChunks: { chunks: 'all' },
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: '/node_modules/',
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.(s*)css$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
            {
                test: /\.(ttf|woff|woff2|otf)$/,
                use: {
                    loader: 'file-loader',
                },
            },
            {
                test: /\.(svg|jpg|png|gif|jpeg)$/i,
                use: {
                    loader: 'file-loader',
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            minify: {
                removeComments: true,
                removeAttributeQuotes: true,
                removeTagWhitespace: true,
            },
        }),
        new EslintPlugin({
            extensions: ['jsx,js'],
        }),
        new CleanWebpackPlugin({
            dry: true,
            cleanAfterEveryBuildPatterns: [
                '**/*',
                path.join(process.cwd(), 'public/**/*'),
            ],
        }),
    ],
};
