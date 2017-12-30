var request = require('request');
var transaction = require('./transaction.json');

// Request Header
var headers = {
    'Content-Type':     'application/json',
    'Accept':     'application/json',
    'MerchantKey':      '',

};

// Request setup
var options = {
    url: 'https://sandbox.mundipaggone.com/Sale/',
    method: 'POST',
    headers: headers,
    body: transaction,
    json: true
};

// Start the request
request(options, function (error, response, body) {

    if (response.statusCode == 201) {
        // Print out the response body
        console.log(body)
    }
})