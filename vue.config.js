
module.exports = {
    devServer:{
        host:'localhost',
        port: 3000,
        proxy:{
            '/api':{
                target:'http://mall-pre.springboot.cn',
                changeOrigin:true,
                pathRewrite:{
                    '/api':''
                }
            }
        }
    }
}