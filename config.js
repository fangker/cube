const config = {
    db:'mongodb://dba:123456@localhost:27017/cube',
    redis_host: 'localhost',
    redis_port: '6379',
    redis_db: 0,
    redis_password:'',
    redis_family: 4,
    cook_key: 'cube',
    content:{
        //导航页标题
        nav:[
            ['/about','关于']

        ],
        tabs:[
            ['share','分享'],
            ['product','产品']
        ]

    }
}

module.exports = config;