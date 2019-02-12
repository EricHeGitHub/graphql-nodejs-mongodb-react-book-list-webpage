const mongooes = require('mongoose')
const Schema = mongooes.Schema;

const bookSchema = new Schema ({
  name: String,
  genre: String,
  authorID: String
})
module.exports = mongooes.model('Book', bookSchema)
