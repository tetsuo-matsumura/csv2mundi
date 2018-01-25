var mongoose = require('mongoose');

module.exports = mongoose.model('CreditCardTransactionCollection', {
        Priority: { type: [Number], index: true },
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
        processDate: Date,
        responseOrder: Number,
        processMessage: String,
        fileID: String 
    },"CreditCardTransactionCollection");