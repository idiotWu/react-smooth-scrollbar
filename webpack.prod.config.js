module.exports = {
    output: {
        library: 'Scrollbar',
        libraryTarget: 'umd'
    },
    externals: {
        react: {
            root: 'React',
            commonjs: 'react',
            commonjs2: 'react',
            amd: 'react'
        },
        'prop-types': {
            root: 'PropTypes',
            commonjs: 'prop-types',
            commonjs2: 'prop-types',
            amd: 'prop-types'
        },
        'smooth-scrollbar': {
            root: 'Scrollbar',
            commonjs: 'smooth-scrollbar',
            commonjs2: 'smooth-scrollbar',
            amd: 'smooth-scrollbar'
        }
    },
    module: {
        preLoaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'eslint-loader'
        }],
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015', 'stage-0', 'react'],
                plugins: [
                    'add-module-exports',
                ]
            }
        }]
    }
};
