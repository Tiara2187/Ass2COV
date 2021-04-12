const mongoose = require('mongoose');

const barrackSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    barrackname: { type: String, required: true},
    lastcollect:{
        type: Number,
        default: Date.now()
    }
},
{
    timestamps: true
}
);
module.exports = mongoose.model('Barrack', barrackSchema);