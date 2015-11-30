var mongoose = require('mongoose');
var express = require('express');
var app = express();
var unicornsRouter = require(__dirname + '/routes/unicorns_routes')
var usersRouter = require(__dirname + '/routes/users_routes')

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/unicorn_stream_dev');

app.use(express.static('public'));

app.use('/api', unicornsRouter);
app.use('/api', usersRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up');
});
