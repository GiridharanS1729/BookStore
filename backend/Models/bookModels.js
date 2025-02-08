const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    genre: String,
    read: Boolean
});
module.exports = mongoose.model('Book', bookSchema, "books");
