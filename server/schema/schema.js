const graphql = require('graphql')
const _= require('lodash')
const Book = require('../models/book')
const Author = require('../models/author')

const {GraphQLObjectType,
       GraphQLString,
       GraphQLSchema,
       GraphQLID,
       GraphQLInt,
       GraphQLList,
       GraphQLNonNull
      } = graphql;

//dummy data
var books = [
  {name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorID: '1'},
  {name: 'The Final Empire', genre: 'Fantasy', id: '2', authorID: '2'},
  {name: 'The Long Earth', genre: 'Sci-Fi', id: '3', authorID: '3'},
  {name: 'The Hero of Ages', genre: 'Fantasy', id: '4', authorID: '2'},
  {name: 'The Colour of Magic', genre: 'Fantasy', id: '5', authorID: '2'},
  {name: 'The Light Fantastic', genre: 'Sci-Fi', id: '6', authorID: '3'}
]

var authors = [
    { name: 'Patrick Rothfuss', age: 44, id: '1' },
    { name: 'Brandon Sanderson', age: 42, id: '2' },
    { name: 'Terry Pratchett', age: 66, id: '3' }
];


const BookType = new GraphQLObjectType({
  name: 'Book',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    genre: {type: GraphQLString},
    author: {
      type: AuthorType,
      resolve(parent, args){
        return Author.findById(parent.authorID);
        //return _.find(authors, {id : parent.authorID})
      }
    }
  })
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields:() => ({
    id: {type: GraphQLID},
    name: {type: GraphQLString},
    age: {type: GraphQLInt},
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args){
        return Book.find({authorID: parent.id})
      }
    }
  })
});

const RootQuery = new GraphQLObjectType({
  name : 'RootQueryType',
  fields:{
    book:{
      type: BookType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args){
        return Book.findById(args.id);
        //return _.find(books, {id : args.id});
      }
    },
    author:{
      type: AuthorType,
      args: {id:{type: GraphQLID}},
      resolve(parent, args){
        return Author.findById(args.id);
        //return _.find(authors, {id : args.id});
      }
    },
    books : {
      type : GraphQLList(BookType),
      resolve(parent, agrs){
        return Book.find({})
        //return books
      }
    },
    authors : {
      type: GraphQLList(AuthorType),
      resolve(parent, args){
        return Author.find({})
        //return authors
      }
    }
  }
});

const mutation =  new GraphQLObjectType({
  name: 'mutationEric',
  fields:{
    addAuthor:{
      type: AuthorType,
      args: {
        name:{type: new GraphQLNonNull(GraphQLString)},
        age: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve(parent, args){
        let author = new Author({
          name: args.name,
          age: args.age
        })
        return author.save()
      }
    },
    addBook:{
      type: BookType,
      args:{name: {type: new GraphQLNonNull(GraphQLString)},
            genre : {type: new GraphQLNonNull(GraphQLString)},
            authorID : {type: new GraphQLNonNull(GraphQLID)}},
      resolve(parent, args){
        let book = new Book({name: args.name, genre: args.genre, authorID: args.authorID})
        return book.save()
      }
    }
  }
}
)


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: mutation
})
