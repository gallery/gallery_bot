irc_client.addListener('message', function(from, to, text) {
  var matches = text.match(/^~reg(?:ister[-_]?)?url (\S+) (\S+)/i);
  if (matches) {
    redis_client.set('url:' + matches[1].toLowerCase(), matches[2], function(err, res) {
      irc_client.say_in_response(from, to, 'URL ' + matches[1] + ' registered!');
    });
  }
});

irc_client.addListener('message', function(from, to, text) {
  var matches = text.match(/^~unreg(?:ister[-_]?)?url (\S+)/i);
  if (matches) {
    redis_client.del('url:' + matches[1].toLowerCase(), function(err, res) {
      irc_client.say_in_response(from, to, 'URL ' + matches[1] + ' unregistered!');
    });
  }
});

irc_client.addListener('message', function(from, to, text) {
  var matches = text.match(/^~(?:url )?(\S+)\s?(.*)$/i);
  if (matches) {
    var url_id = matches[1].toLowerCase();
    var positional_matches = matches[2].split(/\s+/);

    redis_client.get('url:' + url_id, function(err, obj) {
      if (obj) {
        url_with_args = obj.replace(/%s/g, function() { return positional_matches.shift(); });
        irc_client.say_in_response(from, to, url_with_args);
      }
    });
  }
});
