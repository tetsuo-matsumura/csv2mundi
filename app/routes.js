var File = require('./models/file.js');
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
        console.log("oi");
        File.create({
            name: req.body.name,
            path: req.body.path,
            rowcount: req.body.rowcount,
            status: "WAITING"
        }, function(err, data){
            if(err){
                res.send(err);
            }
        });
    });

    app.post('/api/upload', multipartyMiddleware, FileUploadController.uploadFile);

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};