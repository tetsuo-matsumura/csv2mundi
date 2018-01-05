var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
	CreditCardTransactionCollection: [{
		Priority:  Number,
		AmountInCents: Number,
		CreditCard: {
			CreditCardBrand: String,
			CreditCardNumber: String,
			ExpMonth: Number,
			ExpYear: Number,
			HolderName: String,
			SecurityCode: String
			},
		InstallmentCount: Number,
		TransactionStatus: String 
		}]
});

module.exports = mongoose.model('Transaction', TransactionSchema);