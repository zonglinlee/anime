const path = require('path');

module.exports = {
    entry: './example/test.js',
    mode: "development",
    devtool: 'source-map',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    }
};
