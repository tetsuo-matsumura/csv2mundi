Papa = require("papaparse");
var Transaction = require('./transaction.js');
var Report = require('./report.js');
fs = require("fs");
var fileDir = './light.csv'; 
var fileStats = fs.statSync(fileDir);
readStream = fs.createReadStream(fileDir);
writeStream = fs.createWriteStream('temp.json');
var size = 0;
var percent = 0;
var oldpercent = 0;

var papaConfig = 
{
	delimiter: ",",	// auto-detect
	newline: "",	// auto-detect
	quoteChar: '"',
	header: false,
	dynamicTyping: false,
	preview: 0,
	encoding: "utf-8",
	worker: false,
	comments: false,
	step: function(results, parser) {
// OLD SOLUTION, LEAVING HERE FOR DEBUG REASONS
	/*Transaction.create({
			"Priority": results.data[0][0],
			"AmountInCents": results.data[0][1],
			"CreditCard": {
				"CreditCardBrand": results.data[0][2],
				"CreditCardNumber": results.data[0][3],
				"ExpMonth": results.data[0][4],
				"ExpYear": results.data[0][5],
				"HolderName": results.data[0][6],
				"SecurityCode": results.data[0][7]
				},
				processStatus: 1,
				fileID: 'something'
		}, (err, result) => {
		if(err){
			console.log('Unable to insert data', err);
			res.send(err)
		}
	});*/
		if(percent == 0){
			writeStream.write('[');
		}
		if(percent == oldpercent){
			percent = parseInt(parser.streamer._input.bytesRead*100/fileStats.size) + '%'
		} else {
			percent = parseInt(parser.streamer._input.bytesRead*100/fileStats.size) + '%';
			oldpercent = percent;
			console.log(percent+parser.streamer._input.bytesRead + '/' + fileStats.size);
		}
		var resultObject = 
		{
			"Priority": parseInt(results.data[0][0]),
			"AmountInCents": parseInt(results.data[0][1]),
			"CreditCard": {
				"CreditCardBrand": results.data[0][2],
				"CreditCardNumber": results.data[0][3],
				"ExpMonth": parseInt(results.data[0][4]),
				"ExpYear": parseInt(results.data[0][5]),
				"HolderName": results.data[0][6],
				"SecurityCode": parseInt(results.data[0][7])
				},
				processStatus: 1,
				fileID: 'something'
		};
		writeStream.write(JSON.stringify(resultObject)+',');
		//console.log(results.data[0])
	},
	complete: function(results,file){
	console.log("Parsing complete:", file.path);
	console.log(results)
	writeStream.write('{}]');

	},
	error: function(error, file) {
	console.log("Error:", error, file);
	},
	download: false,
	skipEmptyLines: false,
	chunk: undefined,
	fastMode: undefined,
	beforeFirstChunk: undefined,
	withCredentials: undefined
};
Papa.parse(readStream,papaConfig);

function parseFile(req, res) {
	//Find the file by FileID
//	Report.find(req.params).exec(function (err, report) { 
//		if (err) {
//	   	    res.send(err);
//	   	}
//      	var fileDir = report.path;
//      	readStream = fs.createReadStream(fileDir);
 //     	Papa.parse(readStream,papaConfig);

  //  });
};