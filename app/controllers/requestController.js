RequestProcess = function() {};
var request = require('request');
var setup = require('../../setup.js');
var CreditCardTransactionCollection = require('../models/transaction.js');
var Report = require('../models/report.js')
var mongoose = require('mongoose');

// Program variables
var count = 0;
var lock = false;
var errorCount = 0;
var fileGlobal = '';
var result = '';
var reportCount = 0;

// Config request
var headers = {
    'Content-Type':     'application/json',
    'Accept':     'application/json',
    'MerchantKey':      setup.merchantkey,

};
var options = {
    url: 'https://sandbox.mundipaggone.com/Sale/',
    method: 'POST',
    headers: headers,
    body: result,
    json: true
};

// Receive fileid from main application
// Fills pool with 100 documents by Priority

function startRequest(fileid){
    return new Promise(function (fulfill, reject){
        fileGlobal = fileid;
        Report.findOneAndUpdate({fileID: fileid},{processStatus: -1,status:-1}).exec(function(err){
                if(err) return;
        });
        CreditCardTransactionCollection
            .find({$or:[{"fileID": fileid, "processStatus":0}, {"fileID": fileid, "processStatus":-1}]})
            .sort({Priority:1})
            .limit(100)
            .lean()
            .exec(function(err, Data){
                if(err) return;
                else {
                    var q = CreditCardTransactionCollection.update(
                        {_id: {$in: Data}},
                        {"processStatus":-1},
                        {multi:true});

                    q.exec(function(err,result){
                        if(err) return;
                        if(result.n >0) fulfill(selectTransaction(Data));
                        else return;
                    });
                    
                };
            });
    });
};

// Gets documents by Priority

function findTransactions(fileid){
        if(lock) return;
        lock = true;

        CreditCardTransactionCollection
            .find({"fileID": fileid, "processStatus":0})
            .sort({Priority:1})
            .limit(setup.simulimit)
            .lean()
            .exec(function(err, Data){
                if(err) return;
                else {
                    var q = CreditCardTransactionCollection.update(
                        {_id: {$in: Data}},
                        {"processStatus":-1},
                        {multi:true});

                    q.exec(function(err,result){
                        if(err) return;
                        if(result.n >0) {
                            lock = false;
                            selectTransaction(Data);
                        }
                        else return;
                    });
                    
                };
            });
};

// Receives array of documents and sends them one by one, counting the total

function selectTransaction(data){
        data.forEach((file,index)=>{
            sendRequest(file);
            count++;
        });
}

// Receives unique document, inject its content into JSON,
// sends to API and parse response. 

function sendRequest(data){
         options.body = JSON.parse("{\"CreditCardTransactionCollection\":["
         + JSON.stringify(data)
         + "],\"Order\":{\"OrderReference\":\""
         + data._id
         + "\"}}");
        request(options, function (error, response, body) {
            if(error){
                ignoreError(data.fileID, data._id); 
                // REQUEST ERROR - TRY AGAIN
            } else {
                if (response.statusCode == 201) {
                    logTransaction(body.CreditCardTransactionResultCollection[0].AcquirerMessage, data.fileID, data._id);
                    // SUCCESS - LOG
                } else {
                    if(!body.ErrorReport) fulfill(logError(response.statusMessage, data.fileID, data._id));
                    else logError(body.ErrorReport.ErrorItemCollection[0].Description, data.fileID, data._id);
                    // TRANSACTION ERROR - LOG AND IGNORE
                }
            }
        });
};


// Checks if pool is full, rejecting new requests
// If pool is empty calls the closing function

function watchResponse(fileid){
        console.log("Queued: " + count);
        if(count<setup.querylimit){
            if(count==0) logReport(fileid);
            else findTransactions(fileid);
        }else{
            return;
        }
};

// Update document with it's response from API

function logTransaction(mundiResponse,fileid,uniqueid){
        var date = new Date();
        CreditCardTransactionCollection.findByIdAndUpdate(uniqueid,
                { 
                    processStatus: 1,
                    processDate: date,
                    processMessage: mundiResponse
                }).exec(function(error){
                    count--;
                    reportCount++;
                    if(error) console.log(error);
                    else watchResponse(fileid);
                });
}

// Update document with it's response from API

function logError(mundiResponse,fileid,uniqueid){
        var date = new Date();
        errorCount++;
        CreditCardTransactionCollection.findByIdAndUpdate(uniqueid,
                { 
                    processStatus: 2,
                    processDate: date,
                    processMessage: mundiResponse
                }).exec(function(error){
                    count--;
                    if(error) console.log(error);
                    else watchResponse(fileid);
                });
}

// Toggle document's status to 0 to have it sent again

function ignoreError(fileid,uniqueid){
        var date = new Date();
        errorCount++;
        CreditCardTransactionCollection.findByIdAndUpdate(uniqueid,
                { 
                    processStatus: 0,
                    processDate: date,
                }).exec(function(error){
                    count--;
                    if(error) console.log(error);
                    else watchResponse(fileid);
        });
}

// Clear the variables, update report with the processing info
// finishes program

function logReport(fileid){
    return new Promise(function(fulfill,reject){
        var date = new Date();
        Report.findOneAndUpdate({fileID: fileid},{
            dateProcess: date,
            processStatus: 1,
            status: 1,
            $inc:{
                processErrorCount: errorCount,
                processCount: reportCount
            }
        }).exec(function(err){
            count = 0;
            lock = false;
            errorCount = 0;
            fileGlobal = '';
            reportCount = 0;
            return;
        });
    });
}

RequestProcess.prototype.process = function(req, res) {

            startRequest(req.params.fileID);
            res.send("ok");

}

module.exports = new RequestProcess;