const express = require('express');
const graphqlHTTP =  require('express-graphql')
const schema = require('./schema/schema')
const mongooes = require('mongoose')
const cors = require('cors')

mongooes.connect('mongodb://EricGeek:Nmghjw166*900709@ds131905.mlab.com:31905/gql-ninja');
mongooes.connection.once('open', ()=>{
  console.log('connected to database')
})

var app = express();

// allow cross origin requests
app.use(cors())
app.use('/graphql', graphqlHTTP({
  schema: schema,
  graphiql:true
}))

app.listen(4000,() =>{
  console.log('now listening for requests on port 4000')
})
