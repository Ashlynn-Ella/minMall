
module.exports = {
    devServer:{
        host:'localhost',
        port: 3000,
        proxy:{
            '/api':{
                target:'https://coding.imooc.com',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}