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
  /**
   * The following takes the blob uploaded to an arbitrary location with
   * a random file name and copies it to the specified file.path with the file.name.
   * Note that the file.name should come from your upload request on the client side
   * because when the file is selected it is paired with its name. The file.name is
   * not random nor is the file.path.
   */
  fs.readFile(req.files.file.path, function (err, data) {
    // set the correct path for the file not the temporary one from the API:
    req.files.file.path = "./public/files/" + req.files.file.name;
    // copy the data from the req.files.file.path and paste it to file.path
    fs.writeFile(req.files.file.path, data, function (err) {
      if (err) {
        return console.warn(err);
      }
      console.log("The file: " + req.files.file.name + " was saved to " + req.files.file.path);
    });
  });
}
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