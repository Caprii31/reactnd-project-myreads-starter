import { bool } from 'prop-types';
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from '../BooksAPI'
import Book from './book';



export default class Search extends Component {
    state = {
        query:'',
        searchBooks:''
    }

    
   
        search = async (query) => {
            
            if(this.state.query === ''){
                this.setState(()=>({
                    searchBooks:''
                }))
 
            }else{
                try {
                    const books = await BooksAPI.search(this.state.query)

                    books.map(book =>{
                        if(this.props.allBooks.find( b => book.id===b.id)){
                            book.shelf = this.props.allBooks.find( b => book.id===b.id).shelf
                        }
                        else{
                            book.shelf='none'
                        }
                    })
                    

                    this.setState(()=>({
                    searchBooks:books
                    }))
                    console.log(books)
                }
                catch(err) {
                    this.setState(()=>({
                        searchBooks:''
                    }))
                    console.error(err)
                }
            }
            
        }
    
    
    updateQuery = (query) => {
            this.setState(()=>({
            query:query.trim()
        }))

        this.search()
       
    }



    render() {
        
       console.log(this.state.searchBooks)
        
        return (
            <div>
                
                <div className="search-books">
                    <div className="search-books-bar">
                        <Link className="close-search" to='/'>Close</Link>
                        <div className="search-books-input-wrapper">
                            {/*
                            NOTES: The search from BooksAPI is limited to a particular set of search terms.
                            You can find these search terms here:
                            https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                            However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                            you don't find a specific author or title. Every search is limited by search terms.
                            */}
                            <input type="text" placeholder="Search by title or author" value={this.state.query} onChange={(e)=>{this.updateQuery(e.target.value)}}/>

                        </div>
                    </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                        {this.state.query !=='' && this.state.searchBooks &&
                            this.state.searchBooks.map((book) =>(
                                
                                <li key={book.id}>
                                   <Book onChange = {this.props.onChange} book={book} /> 
                                </li>
                            ))
                        }
                    </ol>
                </div>
                </div>
            </div>
        )
    }
}
