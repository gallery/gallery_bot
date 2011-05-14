// ~pastebin
irc_client.addListener('message', function(from, to, text) {
  if (text.match(/^~pastebin/i)) {
    irc_client.say(to, 'Paste stuff here (rather than in the channel): http://tools.gallery2.org/pastebin/?sesame')
  }
})

// ~code
irc_client.addListener('message', function(from, to, text) {
  if (matches = text.match(/^~code (\S+)/i)) {
    irc_client.say(to, 'https://github.com/gallery/gallery3/blob/master/' + matches[1])
  }
})
