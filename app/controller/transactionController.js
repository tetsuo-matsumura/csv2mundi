
var mongoose = require('mongoose'),
  Transaction = mongoose.model('Transaction');

exports.list_all_transactions = function(req, res) {
  Transaction.find({"CreditCardTransactionCollection.TransactionStatus":"WAITING"}, function(err, trans) {
    if (err)
      res.send(err);
    res.json(trans);
  }).sort({"CreditCardTransactionCollection.Priority": 1});
};

exports.request_transaction = function(req, res) {
  var new_transaction = new Transaction(req.body);
    new_transaction.save(function(err, trans) {
      if (err)
        res.send(err);
      res.json(trans);
    });
};