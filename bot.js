irc = require('irc')
redis = require('redis')

require('./config.js')

redis_client = redis.createClient(redis_options.port, redis_options.host)
irc_client = new irc.Client(options.server, options.nickName, options)

// Libraries/support
pretty_date = require('./lib/pretty.js')

// TODO: Autoload everything in modules/ directory?
require('./modules/notes.js')
require('./modules/git.js')
require('./modules/links.js')
require('./modules/seen.js')
