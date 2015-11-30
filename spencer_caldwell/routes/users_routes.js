var express = require('express');
var jsonParser = require('body-parser').json();
var User = require(__dirname + '/../models/user');
var handleError = require(__dirname + '/../lib/handle_server_error');
var basicHttp = require(__dirname + '/../lib/basic_http');

var usersRouter = module.exports = exports = express.Router();

usersRouter.post('/signup', jsonParser, function(req, res) {
  var user = new User();
  user.auth.basic.username = req.body.username;
  user.username = req.body.username;
  user.hashPassword(req.body.password);

  user.save(function(err, data) {
    if (err) return handleError(err, res);

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});


usersRouter.get('/signin', basicHttp, function(req, res) {
  if (!(req.auth.username && req.auth.password)) {
    console.log('no basic auth provided');
    return res.status(401).json({msg: 'authenticat says no ... period'});
  }

  User.findOne({'auth.basic.username': req.auth.username}, function(err, user) {
    if (err) {
      console.log('no basic auth providid');
      return res.status(401).json({msg: 'authenticat says talk to the hand'});
    }

    if (!user) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'authenticat says NOOOOO'});
    }

    if (!user.checkPassword(req.auth.password)) {
      console.log('no basic auth provided');
      return res.status(401).json({msg: 'authenticat says no'});
    }

    user.generateToken(function(err, token) {
      if (err) return handleError(err, res);

      res.json({token: token});
    });
  });
});

