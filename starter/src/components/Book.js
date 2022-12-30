import React from 'react'
import BookDetails from './BookDetails'

function Book({shelf,books}) {
  return (
    <div className="bookshelf">
                <h2 className="bookshelf-title">{shelf.name}</h2>
                <div className="bookshelf-books">
                  <ol className="books-grid">
                  {books && books.map((book) => {
            return <BookDetails key={book.id} book={book} shelf={shelf} />
          })}
                  </ol>
                </div>
              </div>
  )
}

export default Book
