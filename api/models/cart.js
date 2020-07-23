const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }
   
});

module.exports = mongoose.model('Cart', cartSchema);