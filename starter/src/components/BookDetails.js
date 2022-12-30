import React from 'react'
import ShelfDropdown from './ShelfDropdown';
import * as BooksAPI from '../BooksAPI'

function BookDetails({ book, updateBookShelf }) {

  // API call to update the shelf of the book
  const updateShelf = (newShelf) => {
    const updateBookDetails = async () => {
      await BooksAPI.update(book, newShelf);
      updateBookShelf(book, newShelf);
    };
    updateBookDetails();
  };
  return (
    <li>
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{
              width: 128,
              height: 193,
              backgroundImage:
                `url(${book.imageLinks &&
                book.imageLinks.thumbnail})`,
            }}
          ></div>
          <ShelfDropdown booksCategory={book.shelf === undefined ? "none" : book.shelf} onChangeShelf={(newShelf) => updateShelf(newShelf)} />
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{book.authors}</div>
      </div>
    </li>
  )
}

export default BookDetails
