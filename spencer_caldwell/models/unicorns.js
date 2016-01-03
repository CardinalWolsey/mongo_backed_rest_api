var mongoose = require('mongoose');

var unicornSchema = new mongoose.Schema({
  name: String,
  species: {type: String, default: 'awesome'},
  color: {type: String, default: 'rainbow'},
  age: {
    type: Number,
    min: 0,
    max: 2000
  },
  mobile_number: {
    type: String,
    validate: {
      validator: function(v) {
        return /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/.test(v);
      },
      message: 'Bitch, please! {VALUE} is not a real phone number!'
    }
  }
});

module.exports = mongoose.model('Unicorn', unicornSchema);
