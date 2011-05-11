var irc = require('irc')
var redis = require('redis')

require('./config.js')

var redis_client = redis.createClient(redis_options.port, redis_options.host)
var irc_client = new irc.Client(options.server, options.nickName, options)
