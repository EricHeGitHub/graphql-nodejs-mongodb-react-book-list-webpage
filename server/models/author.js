const mongooes = require('mongoose')
const Schema = mongooes.Schema;

const authorSchema = new Schema ({
  name: String,
  age: String
})

module.exports = mongooes.model('Author', authorSchema)
