function list_notes(nick, num_notes) {
  if (!num_notes) {
    num_notes = 0
  }

  redis_client.rpop('notes:' + nick.toLowerCase(), function(err, obj) {
    if (obj == null && num_notes == 0) {
      irc_client.say(nick, '[No Notes]')
    } else if (obj != null) {
      note_object = JSON.parse(obj)
      irc_client.say(nick, '[From: ' + note_object[0] + '] ' + note_object[1])

      // Recurse to list all notes
      list_notes(nick, ++num_notes)
    }
  })
}

// callback is function(num_notes)
function num_notes_available(nick, callback) {
  redis_client.llen('notes:' + nick.toLowerCase(), function(err, obj) { callback(obj) })
}

function notify_user_of_available_notes(nick) {
  num_notes_available(nick, function(num_notes) {
    if (num_notes > 0) {
      irc_client.send('NOTICE', nick, 'Notes are available for you. Send ~list-notes in the channel or via /msg to view them')
    }
  })
}

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
    list_notes(from)
  }
})



// notification of available notes when user joins channel
irc_client.addListener('join', function(channel, nick) {
  notify_user_of_available_notes(nick)
})

// notification of available notes when user changes nick
irc_client.addListener('nick', function(oldnick, newnick, channels) {
  notify_user_of_available_notes(newnick)
})
