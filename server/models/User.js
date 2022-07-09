const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    groups: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        default: []
    }],
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);