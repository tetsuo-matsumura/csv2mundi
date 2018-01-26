ReportController = function() {};
const fs = require('fs');
const mongoose = require('mongoose');
var Transaction = require('../models/transaction.js');
var Report = require('../models/report.js');


const HEADER = `
  <!doctype html>
  <html class="no-js" lang="">
    <head>
      <meta charset="utf-8">
      <meta http-equiv="x-ua-compatible" content="ie=edge">
      <title>Transaction report</title>
      <meta name="description" content="Transaction report">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/css/bootstrap.min.css" integrity="sha384-rwoIResjU2yc3z8GV/NPeZWAv56rSmLldC3R/AZzGRnGxQQKnKkoFVhFQhNUwEyJ" crossorigin="anonymous">
      <script src="https://cdnjs.cloudflare.com/ajax/libs/tether/1.4.0/js/tether.min.js" integrity="sha384-DztdAPBWPRXSA/3eYEEUWrWCy7G5KFbe8fFjk5JAIxUYHKkDx6Qin1DkWx51bBrb" crossorigin="anonymous"></script>
      <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-alpha.6/js/bootstrap.min.js" integrity="sha384-vBWWzlZJ8ea9aCX4pEW3rVHjgjt7zpkNpZk+02D9phzyeVkE+jo0ieGizqPLForn" crossorigin="anonymous"></script>
      <link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.min.css" />
      <link rel='stylesheet' href='../stylesheets/normalize.css' />
      <link rel='stylesheet' href='../stylesheets/style.css' />
      <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js" integrity="sha384-A7FZj7v+d/sdmMqp/nOQwliLvUsJfDHW+k9Omg/a/EheAdgtzNs3hpfag6Ed950n" crossorigin="anonymous"></script>
      <script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script>
    </head>
    <body>
    <div class="container">
    <div class="row">
    <div class="">
      <h1 class="display-4"><i class="fa fa-list-alt" aria-hidden="true"> </i>Transaction report</h1>
       <div class="table-responsive">
          <table class="table table-striped table-bordered report-table table-hover table-sm">
            <thead class="thead-default">
              <tr>
                <th>#</th>
                <th>Value</th>
                <th>Brand</th>
                <th>Card Number</th>
                <th>Holder Name</th>
                <th>Mundipagg Response</th>
                <th>Timestamp</th>
              </tr>
            </thead>
            <tbody>

`;

const FOOTER = `
            </tbody>
          </table>
        </div>
      </div>
      </div>
      </div>
    </body>
  </html>
`;

async function createReport(fileid) {

  const file = fs.createWriteStream('./public/reports/'+fileid+'.html');
  const cursor = Transaction.find({fileID:fileid}).sort({Priority:1,processDate:1}).lean().cursor();
  file.setDefaultEncoding('utf8');
  file.write(HEADER);
  let index = 1;
  for (let doc = await cursor.next(); doc != null; doc = await cursor.next()) {
    if(doc.processStatus==2){
      file.write(`
        <tr class="table-danger">
          <td>${index}</td>
          <td>R$`+doc.AmountInCents/100.00+`</td>
          <td>${doc.CreditCard.CreditCardBrand}</td>
          <td>`+doc.CreditCard.CreditCardNumber.slice(0,5)+`****`+doc.CreditCard.CreditCardNumber.slice(-4)+`</td>
          <td>${doc.CreditCard.HolderName}</td>
          <td>${doc.processMessage}</td>
          <td>`+doc.processDate.toISOString().substring(0, 10)+` `+doc.processDate.toISOString().substring(11, 19)+`</td>
       </tr>
      `);
    }else{
      file.write(`
        <tr>
          <td>${index}</td>
          <td>R$`+doc.AmountInCents/100.00+`</td>
          <td>${doc.CreditCard.CreditCardBrand}</td>
          <td>`+doc.CreditCard.CreditCardNumber.slice(0,6)+`****`+doc.CreditCard.CreditCardNumber.slice(-4)+`</td>
          <td>${doc.CreditCard.HolderName}</td>
          <td>${doc.processMessage}</td>
          <td>`+doc.processDate.toISOString().substring(0, 10)+` `+doc.processDate.toISOString().substring(11, 19)+`</td>
        </tr>
      `);
    }
    index++;
  }
await new Promise((resolve, reject) => {

    file.end(FOOTER, err => (err ? reject(err) : resolve()));
  });

Report.findOneAndUpdate({fileID: fileid},{hasReport:true}).exec((err,res)=>{
  console.log('Report created!');
});

}

ReportController.prototype.createReport = function(req, res) {
    createReport(req.params.fileID);
    res.send("ok");
}

module.exports = new ReportController();
