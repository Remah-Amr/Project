const mongoose = require('mongoose');

const wishSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }
   
});

module.exports = mongoose.model('wish',  wishSchema);