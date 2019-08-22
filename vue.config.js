module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:8080/',
                changeOrigin: true
            },
        }
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    }
}