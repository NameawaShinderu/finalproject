    const path = require('path');
   const HtmlWebpackPlugin = require('html-webpack-plugin');
   const CopyPlugin = require('copy-webpack-plugin');

   module.exports = {
     entry: {
       popup: './src/popup.tsx',
       contentScript: './src/contentScript.tsx',
       background: './src/background.ts',
     },
     output: {
       path: path.resolve(__dirname, 'dist'),
       filename: '[name].js',
     },
     module: {
       rules: [
         {
           test: /\.tsx?$/,
           use: 'ts-loader',
           exclude: /node_modules/,
         },
         {
           test: /\.css$/,
           use: ['style-loader', 'css-loader', 'postcss-loader'],
         },
       ],
     },
     resolve: {
       extensions: ['.tsx', '.ts', '.js'],
     },
     plugins: [
       new HtmlWebpackPlugin({
         template: './public/popup.html',
         filename: 'popup.html',
         chunks: ['popup'],
       }),
       new CopyPlugin({
         patterns: [
           { from: 'public/manifest.json', to: 'manifest.json' },
           { from: 'public/icons', to: 'icons' },
         ],
       }),
     ],
     optimization: {
       splitChunks: {
         chunks: 'all',
       },
     },
     devtool: 'cheap-module-source-map',
     mode: 'development',
     performance: {
       hints: false,
     },
   };