FileUploadController = function() {};

FileUploadController.prototype.uploadFile = function(req, res) {
  /**
   * The following takes the blob uploaded to an arbitrary location with
   * a random file name and copies it to the specified file.path with the file.name.
   * Note that the file.name should come from your upload request on the client side
   * because when the file is selected it is paired with its name. The file.name is
   * not random nor is the file.path.
   */
  fs.readFile(req.files.file.path, function (err, data) {
    // set the correct path for the file not the temporary one from the API:
    file.path = "/files/" + file.name;

    // copy the data from the req.files.file.path and paste it to file.path
    fs.writeFile(file.path, data, function (err) {
      if (err) {
        return console.warn(err);
      }
      console.log("The file: " + file.name + " was saved to " + file.path);
    });
  });
}

module.exports = new FileUploadController();