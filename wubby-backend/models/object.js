var mongoose = require('mongoose');

// Schema defines how the user data will be stored in MongoDB
var ObjectSchema = new mongoose.Schema({
  content: String,
});

ObjectSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

module.exports = mongoose.model('Object', ObjectSchema);
