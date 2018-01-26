var Report = require('./models/report.js');
var Transaction = require('./models/transaction.js')
var fs = require('fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var FileUploadController = require('./controllers/uploadController');
var ParseCSVController = require('./controllers/parseController');
var RequestProcess = require('./controllers/requestController');
var ReportController = require('./controllers/reportController');


// SUB CONTROLLERS

function getFiles(res) {
    Report.find({}).exec(function (err, file) {

        if (err) {
            res.send(err);
        }
        res.json(file);
    });
};

function getReports(req, res) {
    Report.find(req.params).exec(function (err, report) {

        if (err) {
            res.send(err);
        }
        res.json(report);
    });
};

function getTransactions(req, res) {

    Transaction.find({fileID: req.params.fileID}).sort("Priority").skip(parseInt(req.params.page)).limit(10).exec(function (err, transaction) {
        if (err) {
            res.send(err);
        };
        res.json(transaction);
    });
};


//ROUTES

module.exports = function (app) {

//GET ROUTES

    app.get('/api/files', function (req, res) {
        getFiles(res);
    });

    app.get('/api/reports/:fileID', function (req, res) {
        getReports(req, res);
    });

    app.get('/api/reports/create/:fileID', ReportController.createReport);

    app.get('/api/transactions/:fileID/:page', function (req, res) {
        getTransactions(req, res);
    });

    app.get('/api/parse/:fileID', ParseCSVController.parseFile);

    app.get('/api/process/:fileID', RequestProcess.process);

    app.get('/api/process/status/:fileID', function(req, res){
        Transaction.count({$or:[{"fileID": req.params.fileID, "processStatus":0}, {"fileID": req.params.fileID, "processStatus":-1}]}).exec(function (err, count) {
            if (err) res.send(err);
            if(count==null){
                res.json(0);
            }else{
            res.json(count);
            }
        });
    });


// POST ROUTES

    app.post('/api/reports', function (req, res) {
        Report.create({
            name: req.body.name,
            path: req.body.path,
            dateUpload: req.body.dateUpload,
            fileID: req.body.fileID,
            status: 0,
            parseStatus: 0,
            processStatus: 0
        }, function(err, data){
            if(err){
                res.send(err);
            }
            getFiles(res);
        });
    });

    app.post('/api/upload', multipartyMiddleware, FileUploadController.uploadFile);


// DELETE ROUTES

    app.delete('/api/files/:fileID', function (req, res) {
        //SELF CONTAINED CONTROLLER - CONSIDER CREATING UNIQUE CONTROLLER ON FUTURE COMMITS
        Report.find({fileID: req.params.fileID}).exec(function (err, file) {
            if (err) res.send(err);
            if(file[0].hasReport){
                fs.unlink('./public/reports/'+req.params.fileID+'.html', function(err){
                    if (err) res.send(err);
                });
            }

            fs.unlink(file[0].path, function(err){
                if (err) res.send(err);

                console.log("File " + file[0].path + " was scheduled for deletion!");
                Report.remove({fileID: req.params.fileID}, function (err, file) {
                    if (err) res.send(err);

                    Transaction.remove({fileID: req.params.fileID}, function(err, file){
                        if (err) res.send(err);

                        getFiles(res);
                    });
                });
            });
        });
    });

// INDEX GET ROUTE

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });


};