// ~r <sha>
irc_client.addListener('message', function(from, to, text) {
  var matches = text.match(/^~r\s?([0-9a-f]{6,})/i);
  if (matches) {
    irc_client.say_in_response(from, to, 'http://github.com/gallery/gallery3/commit/' + matches[1]);
  }
});
