// note to <nick>: ...
irc_client.addListener('message', function(from, to, text) {
  if (matches = text.match(/^note to (\S+): (.*)$/i)) {
    redis_client.rpush('notes:' + matches[1].toLowerCase(), JSON.stringify([from, matches[2]]), function(err, res) {
      irc_client.send('NOTICE', from, 'Note Recorded!')
    })
  }
})

// ~list-notes
irc_client.addListener('message', function(from, to, text) {
  if (matches = text.match(/^~list-notes/i)) {
    var num_notes = 0
    redis_client.rpop('notes:' + from.toLowerCase(), function(err, obj) {
      if (obj == null && num_notes == 0) {
        irc_client.say(from, '[No Notes]')
      } else if (obj != null) {
        note_object = JSON.parse(obj)
        irc_client.say(from, '[From: ' + note_object[0] + '] ' + note_object[1])
      }
    })
  }
})
