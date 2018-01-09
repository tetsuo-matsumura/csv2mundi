var File = require('./models/file.js');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var FileUploadController = require('./controllers/uploadController');

function getFiles(res) {
    File.find(function (err, files) {

        if (err) {
            res.send(err);
        }

        res.json(files);
    });
};

module.exports = function (app) {

    app.get('/api/files', function (req, res) {
        getFiles(res);
    });

    app.post('/api/upload', multipartyMiddleware, FileUploadController.uploadFile);

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};