const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    payer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    paidFor: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, { timestamps: true });

module.exports = mongoose.model('Entry', entrySchema);
