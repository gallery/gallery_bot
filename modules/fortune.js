irc_client.addListener('message', function(from, to, text) {
  if (text.match(/^~fortune/i)) {
    child_process = require('child_process')

    fortune_process = child_process.exec('fortune -s', function(err, stdout, stderr) {
      irc_client.say_in_response(from, to, stdout.replace(/[\t\r\n]/g, ' '))
    })
  }
})