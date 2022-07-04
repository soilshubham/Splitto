const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    users: {
        type: Array,
        default: []
    },
    entries: {
        type: Array,
        default: []
    },
}, { timestamps: true });

module.exports = mongoose.model('Group', groupSchema);
