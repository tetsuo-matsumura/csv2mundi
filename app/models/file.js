var mongoose = require('mongoose');

module.exports = mongoose.model('File', {
	name: String,
	path: String,
	rowCount: String,
	status: Number,
	fileID: Number
});