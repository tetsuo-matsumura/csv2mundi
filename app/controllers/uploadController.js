FileUploadController = function() {};
var fs = require('fs');

FileUploadController.prototype.uploadFile = function(req, res) {

  fs.readFile(req.files.file.path, function (err, data) {
    var i = 2;
    req.files.file.path = "./public/files/" + req.files.file.name;

//CUIDADO, GAMBIARRA DE ALTO NIVEL!!
    while(fs.existsSync(req.files.file.path)){
      if(i<4){
        req.files.file.path = req.files.file.path.slice(0, -4-((i-2)*3)) + '('+ i.toString() + ')' + ".csv";
      } else {
        req.files.file.path = req.files.file.path.slice(0, -7) + '('+ i.toString() + ')' + ".csv";
      }
      i++;
    }
//FIM DA GAMBIARRA

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
