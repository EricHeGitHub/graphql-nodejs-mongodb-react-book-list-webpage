import React, { Component } from 'react';
import {graphql} from 'react-apollo'
import {getBooksQuery} from '../queries/queries'
import BookDetails from './BookDetails'

class BookList extends Component {
  constructor(props){
    super(props)
    this.state = {
      selected: null
    }
  }
  displyBooks = (e) => {
    var data = this.props.data;
    if(data.loading === true){
      return (<div>Loading Books</div>)
    }else{
      return data.books.map(book => {
        return(
          <li key = {book.id} onClick = {(e) => (this.setState({selected: book.id}))}>{book.name}</li>
        )
      })
    }
  }


  render() {
    return (
      <div >
        <ul id = "book-list">
          {this.displyBooks()}
        </ul>
        <BookDetails bookID = {this.state.selected}/>
      </div>
    );
  }
}

export default graphql(getBooksQuery)(BookList);
