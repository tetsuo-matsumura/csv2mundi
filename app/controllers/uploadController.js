FileUploadController = function() {};
var fs = require('fs');

FileUploadController.prototype.uploadFile = function(req, res) {

  fs.readFile(req.files.file.path, function (err, data) {
    var d = new Date();
    req.files.file.path = "./public/files/" +
    d.getFullYear() + '-' + d.getMonth()+1 + '-' + d.getDate() + '-' + d.getHours() + d.getMinutes() + '-' + req.files.file.name;

    fs.writeFile(req.files.file.path, data, function (err) {
      if (err) {
        return console.warn(err);
      }
      console.log("The file: " + req.files.file.name + " was saved as " + req.files.file.path);
      res.send(req.files.file);
    });
  });
};

module.exports = new FileUploadController();
