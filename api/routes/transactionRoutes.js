module.exports = function(app) {
  var transaction = require('../controller/transactionController');

  // todoList Routes
  app.route('/transactions')
    .get(transaction.list_all_transactions)
    .post(transaction.request_transaction);
};