var child = require('child_process');

var sentences = ["Hello good friends. I Love you.", "Everything is beautiful", "You suck monkey tails badly, i hate you"]

sentences.unshift('vader.py');
var sentiment = child.spawn('python', sentences);
var chunk = '';
sentiment.stdout.on('data', function(data) {
  chunk += data;
});

sentiment.stdout.on('close', function(code) {
  console.log(chunk);
});
