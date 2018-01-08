var File = require('./models/file.js');
var fileUpload = require('./controller/uploadController.js');

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

    app.post('api/upload', function (req, res) {
        fileUpload(res);
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};