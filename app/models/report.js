var mongoose = require('mongoose');

module.exports = mongoose.model('Report', {
	name: String,
	path: String,
	dateUpload: Date,
	dateParse: Date,
	dateProcess: Date,
	rowCount: String,
	processCount: Number,
	tempProcessCount: Number,
	rowErrorCount: String,
	processErrorCount: Number,
	status: Number,
	parseStatus: Number,
	processStatus: Number,
	hasReport: Boolean,
	fileID: String
},"reports");