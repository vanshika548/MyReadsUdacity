import React from 'react';
import Book from './Book';
import { Link } from 'react-router-dom';
import { PropTypes } from "prop-types";

function ListOfBooks({ books, myShelves, updateBookByShelf }) {

  // filter books according to the shelf
  const filterBooksByShelf = (shelf) => {
    return books && books.filter(book => book.shelf === shelf.key);
  }

  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          {myShelves.map((shelf) => {
            return <Book shelf={shelf} key={shelf.key} books={filterBooksByShelf(shelf)} updateBookByShelf={(book, updatedShelf) =>
              updateBookByShelf(book, updatedShelf)
            }
            />
          })}
        </div>
      </div>
      <div className="open-search">
        <Link to='/search'>Add a book</Link>
      </div>
    </div>
  )
}

export default ListOfBooks;

ListOfBooks.propTypes = {
  books: PropTypes.array.isRequired,
  myShelves: PropTypes.array.isRequired,
  updateBookByShelf: PropTypes.func.isRequired
};
