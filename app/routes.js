var File = require('./models/file.js');
var fs = require('fs');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var FileUploadController = require('./controllers/uploadController');

function getFiles(res) {
    File.find({}).exec(function (err, file) {

        if (err) {
            res.send(err);
        }
        res.json(file);
    });
};

module.exports = function (app) {

    app.get('/api/files', function (req, res) {
        getFiles(res);
    });

    app.post('/api/files', function (req, res) {
        File.create({
            name: req.body.name,
            path: req.body.path,
            rowcount: req.body.rowcount,
            status: 0
        }, function(err, data){
            if(err){
                res.send(err);
            }
        });
        getFiles(res);
    });

    app.post('/api/upload', multipartyMiddleware, FileUploadController.uploadFile);

    app.delete('/api/files/:file_id', function (req, res) {
        File.find({_id: req.params.file_id}).exec(function (err, file) {
            if (err) {
                res.send(err);
            }
            fs.unlink(file[0].path, function(err){
                if (err) {
                res.send(err);
                }
                console.log("File " + file[0].path + " was deleted!");
                File.remove({
                    _id: req.params.file_id
                }, function (err, file) {
                    if (err){
                        res.send(err);
                    }
                    getFiles(res);
                });
            });
        });
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};