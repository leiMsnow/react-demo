function routes(){
    return [
        {
            title:'登录',
            path:'/login',
            component:require('./container/login')
        },
        {
            title:'注册',
            path:'/register',
            component:require('./container/register')
        },
        {
            title:'Boss',
            path:'/bossInfo',
            component:require('./container/bossinfo')
        },
        {
            title:'牛人',
            path:'/geniusInfo',
            component:require('./container/geniusinfo')
        },
    ]
}
