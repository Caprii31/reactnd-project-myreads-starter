import React from 'react'

function Book(props) {
    const book = props.book

  
    let image = ''
    try{
        image = book.imageLinks.thumbnail
    }
    catch{
        image = 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'
    }
    return (
        
            <div className="book">
                <div className="book-top">
                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${image})`}}></div>
                <div className="book-shelf-changer">
                    <select onChange={(event)=>{props.onChange(book,event.target.value)}} value={book.shelf}  >
                        <option value="move" disabled>Move to...</option>
                        <option value="currentlyReading">Currently Reading</option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                    </select>
                </div>
                </div>
                <div className="book-title">{book.title}</div>
                {book.authors && <div className="book-authors">{book.authors.join()}</div>}
            </div>
        
    )
}

export default Book
