// ~r <sha>
irc_client.addListener('message', function(from, to, text) {
  if (matches = text.match(/^~r\s?([0-9a-f]{6,})/)) {
    irc_client.say(to, 'http://github.com/gallery/gallery3/commit/' + matches[1])
  }
})
