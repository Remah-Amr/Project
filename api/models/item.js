const mongoose = require('mongoose');

const itemSchema = mongoose.Schema({

    _id: mongoose.Schema.Types.ObjectId,

    categoryName: { type: String , required: true },
    
    name: { type: String , required: true },

    price: { type: Number, required: true },
    
    itemImagge: { type: String },


    creationDate: {
        type: Date,
        default: new Date
    }

});

module.exports = mongoose.model('Item', itemSchema);