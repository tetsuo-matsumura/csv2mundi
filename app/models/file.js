var mongoose = require('mongoose');

module.exports = mongoose.model('File', {
        name: {type:String},
        path: {type:String},
        rowcount: {type:String},
        status: {type:String}
});