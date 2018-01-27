//setup.js
var mongourl = 'mongodb://localhost:27017/csv2mundi'; //default: mongodb://localhost:27017/csv2mundi 
exports.mongourl = mongourl;

var merchantkey = ''; // Your merchant-key
exports.merchantkey = merchantkey;


//REQUEST SETUP
var querylimit = 500; // default: 500
exports.querylimit = querylimit;

var simulimit = 10; // default: 10
exports.simulimit = simulimit;