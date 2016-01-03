var eat = require('eat');
var User = require(__dirname + '/../models/user');

module.exports = exports = function(req, res, next) {
  var token = req.header.token || (req.body)? req.body.token : '';
  debugger;
    if (!token) {
      console.log('no token');
      return res.status(401).json({msg: 'authentiCat seyzzz noe, and is watching you!!!'});
    }
  debugger;
  eat.decode(token, process.env.APP_SECRET, function(err, decoded) {
    if (err) {
      console.log(err);
      return res.status(401).json({msg: 'authentiCat sayszzzz noe!!!1'});
    }

    User.findOne({_id: decoded.id}, function(err, user) {
      if (err) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyzzz noe!!!!2'});
      }

      if (!user) {
        console.log(err);
        return res.status(401).json({msg: 'authentiCat seyzzz noe!!!!!3'});
      }

      req.user = user;
      next();
    });
  });
};
