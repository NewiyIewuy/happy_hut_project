var mongoose = require('mongoose');
var MessageSchema = new mongoose.Schema({
	author: String,
	content: String,
	createdBy: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Message', MessageSchema);
ß