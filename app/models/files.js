var mongoose = require('mongoose');

module.exports = mongoose.model('Files', {
    file: {
        name: String,
        path: String,
        rowcount: Number,
        status: String,
        default: ''
    }
});