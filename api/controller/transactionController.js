
var mongoose = require('mongoose'),
  Transaction = mongoose.model('Transaction');

exports.list_all_transactions = function(req, res) {
  Transaction.find({}, function(err, trans) {
    if (err)
      res.send(err);
    res.json(trans);
  });
};

exports.request_transaction = function(req, res) {
  var new_transaction = new Transaction(req.body);
    new_transaction.save(function(err, trans) {
      if (err)
        res.send(err);
      res.json(trans);
    });
};