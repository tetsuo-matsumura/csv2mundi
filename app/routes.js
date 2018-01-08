var File = require('./models/file.js');
var multiparty = require('connect-multiparty');
var multipartyMiddleware = multiparty();
var fs = require('fs');
//var FileUploadController = require('./controllers/uploadController');

function getFiles(res) {
    File.find(function (err, files) {

        if (err) {
            res.send(err);
        }

        res.json(files);
    });
};

function uploadFile(req, res) {

  fs.readFile(req.files.file.path, function (err, data) {
    req.files.file.path = "./public/files/" + req.files.file.name;
    fs.writeFile(req.files.file.path, data, function (err) {
      if (err) {
        return console.warn(err);
      }
      console.log("The file: " + req.files.file.name + " was saved to " + req.files.file.path);
      res.send();
    });
  });
};

module.exports = function (app) {

    app.get('/api/files', function (req, res) {
        getFiles(res);
    });

    app.post('/api/upload', multipartyMiddleware, function(req, res){
        uploadFile(req, res);
    });

    app.get('*', function (req, res) {
        res.sendFile(__dirname + '/public/index.html'); 
    });
};