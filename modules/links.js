// ~pastebin
irc_client.addListener('message', function(from, to, text) {
  if (text.match(/^~pastebin/i)) {
    irc_client.say_in_response(from, to, 'Paste stuff here (rather than in the channel): http://tools.gallery2.org/pastebin/?sesame');
  }
});

// ~code
irc_client.addListener('message', function(from, to, text) {
  var matches = text.match(/^~code (\S+)/i);
  if (matches) {
    irc_client.say_in_response(from, to, 'https://github.com/gallery/gallery3/blob/master/' + matches[1]);
  }
});

// ~trac or ~ticket
irc_client.addListener('message', function(from, to, text) {
  var matches = text.match(/^~(?:trac|ticket) (\S+)/i);
  if (matches) {
    irc_client.say_in_response(from, to, 'https://sourceforge.net/apps/trac/gallery/ticket/' + matches[1]);
  }
});
