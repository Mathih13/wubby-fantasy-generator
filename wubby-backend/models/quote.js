var mongoose = require('mongoose');

// Schema defines how the user data will be stored in MongoDB
var QuoteSchema = new mongoose.Schema({
  content: String,
});



module.exports = mongoose.model('Quote', QuoteSchema);
