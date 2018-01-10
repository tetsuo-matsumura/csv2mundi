var mongoose = require('mongoose');

module.exports = mongoose.model('File', {
	name: String,
	path: String,
	rowcount: String,
	status: String
});