var mongoose = require('mongoose');

// Schema defines how the user data will be stored in MongoDB
var ActionSchema = new mongoose.Schema({
  content: String,
});

ActionSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

module.exports = mongoose.model('Action', ActionSchema);
