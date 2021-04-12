const mongoose = require('mongoose');

const marketSchema = new mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:false
    },
    marketname: { type: String, required:true },
    lastcollect:{
        type: Number, 
        default: Date.now()
    },
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Market', marketSchema);