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
    const updatedBooks = await BooksAPI.update(book,shelf)
    
   const newBooks = this.state.allBooks.filter(b => b.id!==book.id)
   book.shelf = shelf

   this.setState(()=>({
    allBooks:[...newBooks,book]
   }))



    console.log(updatedBooks)
    console.log(this.state.allBooks)
    console.log(newBooks)
    
    
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
                <MainPage allBooks={this.state.allBooks} onChange={this.onChange}/>
              </Route>   
              <Route exact path="/search">
                <Search allBooks={this.state.allBooks} onChange={this.onChange}/>
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
