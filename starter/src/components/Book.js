import React from 'react';
import BookDetails from './BookDetails';

function Book({ shelf, books, updateBookByShelf }) {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelf.name}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books && books.map((book) => {
            return <BookDetails key={book.id} book={book} shelf={shelf} updateBookByShelf={(book, updatedShelf) =>
              updateBookByShelf(book, updatedShelf)
            } />
          })}
        </ol>
      </div>
    </div>
  )
}

export default Book
