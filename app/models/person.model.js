const mongoose = require('mongoose');

const personSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    age: Number,
    avatar_url: String
}, { collection: 'Person' }) // 

module.exports = mongoose.model('Person', personSchema)