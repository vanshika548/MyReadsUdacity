import React from 'react';
import BookDetails from './BookDetails';
import { PropTypes } from "prop-types";

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

export default Book;

Book.propTypes = {
  books: PropTypes.array.isRequired,
  shelf: PropTypes.object.isRequired,
  updateBookByShelf: PropTypes.func.isRequired
};
