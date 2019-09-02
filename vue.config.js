module.exports = {
    devServer: {
        proxy: {
            "/api": {
                target: "https://etis-technologies.herokuapp.com"
            },
        }
    },
    chainWebpack: config => {
        config.module.rules.delete('eslint');
    },
    pwa: {
        themColor: '#503563',
        iconPaths: {
            favicon32: 'img/incon.png',
            favicon16: 'img/incon.png',
        }
    }
}