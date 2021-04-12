const mongoose = require('mongoose');

const farmSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    farmname: { type: String, required: true },
    lastcollect:{
        type: Number,
        default: Date.now()
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model('Farm', farmSchema);