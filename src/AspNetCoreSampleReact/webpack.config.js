const path = require('path');
const webpack = require('webpack');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
    entry: {
        app: './app/app.jsx'
    },
    output: {
        path: 'wwwroot/js/',
        filename: 'storyboard.js',
        library: 'storyboard',
        libraryTarget: 'window'
    },
    resolve: {
        extensions: ['.js', '.jsx']
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify(isProduction
                    ? 'production'
                    : 'development')
            }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js/,
                loaders: ['babel-loader'],
                exclude: [/node_modules/, /wwwroot/]
            }
        ]
    },
    externals: {
        react: 'React',
        'react-dom': 'ReactDOM',
        'react-bootstrap': 'ReactBootstrap'
    },
    devtool: !isProduction
        ? 'source-map'
        : false
};
