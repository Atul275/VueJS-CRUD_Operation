// vue.config.js backend API configuration
module.exports = {
    runtimeCompiler: true,
    devServer: {
        compress: true,
        proxy: 'http://localhost:6060/',
        port: 9999,
        overlay: {
            warnings: true,
            errors: true
        }
    }
}
