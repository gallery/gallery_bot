// ~stalk <user>
irc_client.addListener('message', function(from, to, text) {
  if (matches = text.match(/^~stalk (\S+)/)) {
    redis_client.rpush('stalks:' + matches[1].toLowerCase(), from, function(err, res) {
      irc_client.say(to, 'OK, I will notify you when ' + matches[1] + ' next speaks')
    })
  }
})

// Notify on join or message
function notify_stalks(channel, nick) {
  redis_client.rpop('stalks:' + nick.toLowerCase(), function(err, obj) {
    if (obj != null) {
      stalker = obj
      irc_client.say(stalker, 'I just saw ' + nick + ' in ' + channel)

      // Recurse to get all stalkers
      notify_stalks(channel, nick)
    }
  })
}

irc_client.addListener('join', notify_stalks);
irc_client.addListener('message', function(from, to, text) {
  if (to.match(/^#/)) {
    notify_stalks(to, from);
  }
});
