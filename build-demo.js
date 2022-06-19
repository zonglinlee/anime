const webpack = require('webpack')
const config = require('./webpack.config.js');
const childProcess = require('child_process')
const open = require('open')
webpack(config, serverAndOpenBrowser);
// 如果不传 callback 回调函数，就会返回一个 Compiler 实例，用于让你去控制启动，而不是像上面那样立即启动
const compiler = webpack(config);
let port = '60000'
// 调用 compiler.watch 以监听模式启动，返回的 watching 用于关闭监听
const watching = compiler.watch({
    // watchOptions
    aggregateTimeout: 300,
}, (err, stats) => {
    if (err || stats.hasErrors()) {
        // 构建过程出错
        console.error(err)
    }
    // 成功执行完构建
    serverAndOpenBrowser()
});

// 调用 watching.close 关闭监听
watching.close(() => {
    // 在监听关闭后
})

function serverAndOpenBrowser() {
    childProcess.exec(`http-server -p ${port}`, (err, result) => {
        if (err) {
            console.error('error', err)
        } else {
            console.log(result)
            open(`http://localhost:${port}/example/`, {app: {name: 'google chrome'}})
        }
    })
}
