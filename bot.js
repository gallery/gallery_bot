irc = require('irc')
redis = require('redis')

require('./config.js')

redis_client = redis.createClient(redis_options.port, redis_options.host)
irc_client = new irc.Client(options.server, options.nickName, options)

// Various support methods
// TODO: Move to separate files?

// Determines whether a string represents a channel name
String.prototype.is_channel = function() {
  // Something that starts with a letter is _not_ a channel
  return this.match(/^[a-z]/i) ? false : true
}

// Responds in kind via the channel or private message
irc.Client.prototype.say_in_response = function(from, to, text) {
  dest = to.is_channel() ? to : from
  this.say(dest, text)
}

// Libraries/support
pretty_date = require('./lib/pretty.js')

// TODO: Autoload everything in modules/ directory?
require('./modules/notes.js')
require('./modules/git.js')
require('./modules/links.js')
require('./modules/seen.js')
require('./modules/stalk.js')
