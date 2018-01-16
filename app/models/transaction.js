var mongoose = require('mongoose');

module.exports = mongoose.model('CreditCardTransactionCollection', {
		Priority: Number,
		AmountInCents: Number,
		CreditCard: {
			CreditCardBrand: String,
			CreditCardNumber: String,
			ExpMonth: Number,
			ExpYear: Number,
			HolderName: String,
			SecurityCode: Number
			},
		processStatus: Number,
		fileID: String 
	});