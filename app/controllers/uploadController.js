FileUploadController = function() {};
var fs = require('fs');

FileUploadController.prototype.uploadFile = function(req, res) {

  fs.readFile(req.files.file.path, function (err, data) {
    req.files.file.path = "./public/files/" + req.files.file.name;
    for (i=2; fs.existsSync(req.files.file.path)  != true; i++){
      console.log('oi');
        req.files.file.name = i.toString() + "_" + req.files.file.name;
        req.files.file.path = "./public/files/" + req.files.file.name;
    };

    fs.writeFile(req.files.file.path, data, function (err) {
      if (err) {
        return console.warn(err);
      }
      console.log("The file: " + req.files.file.name + " was saved as " + req.files.file.path);
      res.send();
    });
  });
};

module.exports = new FileUploadController();
