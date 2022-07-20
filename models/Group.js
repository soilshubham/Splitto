const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    entries: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Entry',
        default: []
    }],
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
