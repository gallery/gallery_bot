var irc = require('irc')

require('./config.js')
var client = new irc.Client(options.server, options.nickName, options)
