var express = require('express');
var router = express.Router();
var formidable = require('formidable');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'csv2mundi' });
});

router.get('/upload', function (req, res){
    res.render('index', { title: 'csv2mundi' });
});

router.post('/upload', function (req, res){
    var form = new formidable.IncomingForm();

    form.parse(req);

    form.on('fileBegin', function (name, file){
        file.path = '../public/uploads/' + file.name;
    });

    form.on('file', function (name, file){
        console.log('Uploaded ' + file.name);
    });

    res.render('index', { title: 'csv2mundi' });
});

module.exports = router;
