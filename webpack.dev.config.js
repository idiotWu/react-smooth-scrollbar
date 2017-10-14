module.exports = {
    devtool: 'inline-source-map',
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0', 'react']
            }
        }]
    }
};
