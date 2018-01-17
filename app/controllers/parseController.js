ParseCSVController = function() {};
var fs = require('fs');
var Papa = require("papaparse");
var Spawngo = require('spawngo');

//Local files
var Report = require('../models/report.js');
var tempFile = './app/temp/temp.json';


//Function variables
var size = 0;
var percent = 0;
var oldPercent = 0;
var rowCount = 0;
var rowErrorCount = 0;
var i = 2;

ParseCSVController.prototype.parseFile = function(req, res) {
	console.log(req.params);
  while(fs.existsSync(tempFile)){
    if(i<4){
        tempFile = tempFile.slice(0, -5-((i-2)*3)) + '('+ i.toString() + ')' + ".json";
     } else {
        tempFile = tempFile.slice(0, -8) + '('+ i.toString() + ')' + ".json";
      }
      i++;
    };
  var writeStream = fs.createWriteStream(tempFile);

  Report.find(req.params).exec(function (err, report) {
  		console.log(report[0].fileID);
        if (err) {
            res.send(err);
        }
        var readStream = fs.createReadStream(report[0].path);
        var fileStats = fs.statSync(report[0].path);
        let spawngo = new Spawngo({
          db: 'csv2mundi',
          collection: 'CreditCardTransactionCollection',
          jsonArray: true,
          drop: false
        });

        var papaConfig = 
        {
          delimiter: ",", // auto-detect
          newline: "",  // auto-detect
          quoteChar: '"',
          header: false,
          dynamicTyping: false,
          preview: 0,
          encoding: "utf-8",
          worker: false,
          comments: false,
          step: function(results, parser) {
            if(percent == 0){
              writeStream.write('[');
            }
            if(percent == oldPercent){
              percent = parseInt(parser.streamer._input.bytesRead*100/fileStats.size) + '%'
            } else {
              percent = parseInt(parser.streamer._input.bytesRead*100/fileStats.size) + '%';
              oldPercent = percent;
              console.log(parseFloat(parser.streamer._input.bytesRead/1000000).toFixed(1)+'MB' + '/' + parseFloat(fileStats.size/1000000).toFixed(1)+'MB'+' ('+percent+')');
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
                fileID: report[0].fileID
            };
            if(results.data[0].length != 8){
            	var resultObject = {};
            	rowErrorCount++;
            };
            writeStream.write(JSON.stringify(resultObject)+',');
            rowCount++;
          },
          complete: function(results,file){
          writeStream.write('{}]');
          console.log("Parsing complete:", file.path);
          let childProcess = spawngo.import(tempFile);
            childProcess.stdout.on('data', function (data) {
              //EMPTY
            });
            childProcess.stderr.on('data', function (data) {
              console.log(data.toString('utf8'));
            });
            childProcess.on('close', function (data) {
            	fs.unlinkSync(tempFile);
				console.log(`child process exited with code ${data}`);
				res.send('Rowcount: '+rowCount+'\n'+'Error count:'+rowErrorCount);
				childProcess.stdin.destroy();
            });
          },
          error: function(error, file) {
            console.log("Error:", error, file);
            rowCount++;
          },
          download: false,
          skipEmptyLines: false,
          chunk: undefined,
          fastMode: undefined,
          beforeFirstChunk: undefined,
          withCredentials: undefined
        };

        Papa.parse(readStream,papaConfig);
        
    });
};

module.exports = new ParseCSVController();
