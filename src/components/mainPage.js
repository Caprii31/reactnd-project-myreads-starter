import { object } from 'prop-types';
import React from 'react';
import Book from './book'

const Mainpage = (props) => {
    const { books } = props


    const bookState = {
        allbooks:[],
        wantToRead : [],
        currentlyReading : [],
        read : [],
        
    }

    
    return (
        <div className='list-books-conten'>
            {Object.keys(bookState).map(state =>(
                <section className="bookshelf">
                    <h2 className="bookshelf-title">{state}</h2>
                    <div className="bookshelf-books">
                        <ol className="bookgrid">
                            {books.filter(book => book.shelf===state)
                            .map(book => (
                                <li>
                                    <Book />
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
