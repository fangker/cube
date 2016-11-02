const Redis = require("ioredis");
const Store = require("koa-session2/libs/store");
class RedisStore extends Store {
    constructor(config) {
        super();
        this.redis_config=config;
        this.redis = new Redis({
             port: this.redis_config.redis_port,       
             host: this.redis_config.redis_host,  
             family: this.redis_config.redis_family,          
             password: this.redis_config.redis_password,
             db: this.redis_config.redis_db
        });
    }

    async get(sid) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }

    async set(session, opts) {
        if(!opts.sid) {
            opts.sid = this.getID(24);
        }
        await this.redis.set(`SESSION:${opts.sid}`, JSON.stringify(session));
        return opts.sid;
    }

    async destroy(sid) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;