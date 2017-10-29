const path = require('path');

module.exports = {
    context:__dirname,
    entry:'./js/App.jsx',
    output:{
        path:path.join(__dirname,'public'),
        filename:'bundle.js',
        publicPath:'/public/'
    },
    devServer: {
    port: 8080,
    historyApiFallback: true,
  },

    devtool:'cheap-eval-source-map',
    resolve:{
        extensions:['.js','.jsx','.json']
    },
    stats:{
        colors:true,
        reasons:true,
        chunks:true
    },
    module:{
        rules:[
            {
            exclude:/node_modules/,
            test: /\.jsx?$/,
            loader: 'babel-loader'
          },
          {
            test:/\.less$/,
             use: [{
                loader: "style-loader" // creates style nodes from JS strings 
            }, {
                loader: "css-loader" // translates CSS into CommonJS 
            }, {
                loader: "less-loader" // compiles Less to CSS 
            }]
          }
        ]
    }


}







/*
module.exports = {
  context: __dirname,
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './js/ClientApp.jsx'
  ],
  devtool: 'cheap-eval-source-map',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },
  devServer: {
    hot: true,
    publicPath: '/public/',
    historyApiFallback: true
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new webpack.NamedModulesPlugin()],
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  }
};
*/