// logs time a user says anything
irc_client.addListener('message', function(from, to, text) {
  if (to.is_channel()) { // sent to a channel
    var seen_object = [new Date().valueOf(), text];
    redis_client.set('seen:' + from.toLowerCase(), JSON.stringify(seen_object));
  }
});

// ~seen <nick>
irc_client.addListener('message', function(from, to, text) {
  var matches = text.match(/^~seen (\S+)/i);
  if (matches) {
    redis_client.get('seen:' + matches[1].toLowerCase(), function(err, obj) {
      if (obj) {
        var seen_object = JSON.parse(obj);
        irc_client.say_in_response(from, to, 'I saw ' + matches[1] + ' ' + pretty_date.prettyDate(new Date(seen_object[0])) + ' saying "' + seen_object[1] + '"');
      } else {
        irc_client.say_in_response(from, to, 'I have never seen ' + matches[1]);
      }
    });
  }
});
