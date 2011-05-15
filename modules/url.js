irc_client.addListener('message', function(from, to, text) {
  if (args = text.match(/^~reg(?:ister[-_]?)?url (\S+) (\S+)/i)) {
    redis_client.set('url:' + args[1].toLowerCase(), args[2], function(err, res) {
      irc_client.say_in_response(from, to, 'URL ' + args[1] + ' registered!')
    })
  }
})

irc_client.addListener('message', function(from, to, text) {
  if (args = text.match(/^~unreg(?:ister[-_]?)?url (\S+)/i)) {
    redis_client.del('url:' + args[1].toLowerCase(), function(err, res) {
      irc_client.say_in_response(from, to, 'URL ' + args[1] + ' unregistered!')
    })
  }
})

irc_client.addListener('message', function(from, to, text) {
  if (args = text.match(/^~(?:url )?(\S+)\s?(.*)$/i)) {
    url_id = args[1].toLowerCase()
    positional_args = args[2].split(/\s+/)

    redis_client.get('url:' + url_id, function(err, obj) {
      if (obj != null) {
        irc_client.say_in_response(from, to, obj.replace(/%s/g, function() { return positional_args.shift() }))
      }
    })
  }
})
