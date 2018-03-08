var mongoose = require('mongoose');
var PhotoSchema = new mongoose.Schema({
    title: String,
    key: String,
    description: String,
    username: String,
    file: String,
    createdBy: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Photo', PhotoSchema);