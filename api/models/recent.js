const mongoose = require('mongoose');

const recentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }
   
});

module.exports = mongoose.model('recent', recentSchema);