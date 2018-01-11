var mongoose = require('mongoose');

module.exports = mongoose.model('Report', {
	name: String,
	path: String,
	dateUpload: Date,
	dateParse: Date,
	dateProcess: Date,
	rowCount: String,
	rowErrorCount: String,
	processErrorCount: String,
	status: Number,
	parseStatus: Number,
	processStatus: Number,
	fileID: Number
});