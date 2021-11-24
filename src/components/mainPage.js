import { object, string } from 'prop-types';
import React from 'react';
import Book from './book'

const Mainpage = (props) => {
    const books = props.allbooks
    console.log(books)

    const bookState = {
        allbooks:[],
        wantToRead : [],
        currentlyReading : [],
        read : [],
        
    }

    

    
    return (
        <div className='list-books-conten'>
            {Object.keys(bookState).map(state =>(
                <section className="bookshelf" key={state.length}>
                    <h2 className="bookshelf-title">{state}</h2>
                    <div className="bookshelf-books">
                        <ol className="books-grid">
                            {books.filter(book => book.shelf===state)
                            .map(book => (
                                <li key={book.id}>
                                    <Book book={book} state={state} onChange={props.onChange}/>
                                </li>
                            ))
                            }
                        </ol>
                    </div>
                    
                </section>
            ))}
        </div>
    );
}

export default Mainpage;
