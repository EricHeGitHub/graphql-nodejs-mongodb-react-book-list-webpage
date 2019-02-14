import React, { Component } from 'react';
import {graphql, compose} from 'react-apollo'
import {getAuthorsQuery} from '../queries/queries'
import {addBookMutation} from '../queries/queries'
import {getBooksQuery} from '../queries/queries'

class AddBook extends Component {

  constructor(props){
    super(props);
    this.state = {
      name : "",
      genre : "",
      authorID : ""
    }
  }

  displayAuthors = (e) => {
    var data = this.props.getAuthorsQuery
    if(data.loading){
      return(<option disabled>Loading Authors</option>)
    }else{
      return data.authors.map(author => {
        return(<option key = {author.id} value = {author.id}> {author.name}</option>);
      })
    }
  }

  subimtForm = (e) =>{
    e.preventDefault();
    this.props.addBookMutation({
      variables: {
        name: this.state.name,
        genre: this.state.genre,
        authorID: this.state.authorID
      },
      refetchQueries: [{query : getBooksQuery}]
    })
  }

  render() {
    return (
      <form id = "add-book" onSubmit = {this.subimtForm.bind(this)}>
        <div className = "field">
          <label>Book Name</label>
          <input type = "text" onChange = {(e) => (this.setState({name: e.target.value}))} />
        </div>
        <div className = "field">
          <label>Genre</label>
          <input type = "text" onChange = {(e) => (this.setState({genre: e.target.value}))}/>
        </div>

        <div className = "field">
          <label>Author</label>
          <select onChange = {(e) => (this.setState({authorID: e.target.value}))}>
            <option>Select Author </option>
            {this.displayAuthors()}
          </select>
        </div>
        <button>+</button>
      </form>
    );
  }
}

export default compose(
  graphql(getAuthorsQuery, {name: "getAuthorsQuery"}),
  graphql(addBookMutation, {name: "addBookMutation"})
)(AddBook);
