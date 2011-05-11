irc = require('irc')
redis = require('redis')

require('./config.js')

redis_client = redis.createClient(redis_options.port, redis_options.host)
irc_client = new irc.Client(options.server, options.nickName, options)
