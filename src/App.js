import React from 'react'
 import * as BooksAPI from './BooksAPI'
import './App.css'
import MainPage from './components/mainPage'
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Search from './components/search'

class BooksApp extends React.Component {
  state = {
    allBooks:[],
    showSearchPage: false
  }


  componentDidMount = async()=>{
    const allBooks = await BooksAPI.getAll()
    try{
      this.setState(()=>({
        allBooks
      }))
    }
    catch (err) {
      console.log('error',err)
    }

  }

   onChange =  async (book,shelf) =>{
    await BooksAPI.update(book,shelf)
    BooksAPI.getAll()
    .then(books => this.setState(()=>({
      allBooks:books
    })))

    
  }

  render() {
    return (
      <Router>
      <div className="app">
        
        
       
          <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <Switch>
              <Route exact path="/">
                <MainPage allbooks={this.state.allBooks} onChange={this.onChange}/>
              </Route>   
              <Route exact path="/search">
                <Search allbooks={this.state.allBooks} onChange={this.onChange}/>
              </Route>           
            </Switch>
            <div className="open-search">
              <Link to='/search'>Add a book</Link>
            </div>
          </div>
        
      </div>
      </Router>
    )
  }
}

export default BooksApp
