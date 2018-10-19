const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const path = require('path')

module.exports = {
    entry: './src/index.jsx',
    mode: 'none',
    output: {
        path: path.resolve(__dirname, './public'),
        filename: './app.js'
    },
    devServer: {
        port: 8080,
        contentBase: './public',
        historyApiFallback: true
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            '~MODULES' : path.resolve(__dirname, './node_modules'),
            'jquery': '~MODULES/jquery/dist/jquery.min.js',
            'bootstrap': '~MODULES/bootstrap/dist/js/bootstrap.js'
        }
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            'window.jQuery': 'jquery'
        }),
        new ExtractTextPlugin('app.css')
    ],
    module: {
        rules: [{
            test: /.js[x]?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
                presets:['es2015', 'react'],
                plugins: ['transform-object-rest-spread']
            }
        },
        { 
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader']
              })
          },
          { 
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader']
              })
          }, 
        {
            test: /\.(woff2?|ttf|svg|eot|png|jpg)(\?v=\d+\.\d+\.\d+)?$/,
            loader: 'file-loader',
        }   
    ]
    }
}