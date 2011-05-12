// ~pastebin
irc_client.addListener('message', function(from, to, text) {
  if (text.match(/^~pastebin/i)) {
    irc_client.say(to, 'Paste stuff here (rather than in the channel): http://tools.gallery2.org/pastebin/?sesame')
  }
})
