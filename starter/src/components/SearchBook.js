import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookDetails from './BookDetails';
import { PropTypes } from "prop-types";

function SearchBook({ books, updateBookByShelf }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);

  // API call to update the shelf of particular book
  const updateBookOldCategory = (book, newShelf) => {
    const updateBook = () => {
      const id = searchedBook.findIndex((searchedBook) => {
        return searchedBook.id === book.id;
      });
      if (id >= 0) {
        let updatedBooks = [...searchedBook];
        updatedBooks[id].shelf = newShelf;
        updateBookByShelf(book, newShelf);
        setSearchedBook(updatedBooks);
      }
    };
    updateBook();
  };

  // Search API to get searched book
  const searchBooks = (value) => {
    setSearchQuery(value);
    if (value.trim().length>0) {
      BooksAPI.search(value).then((data) => {
        if (data.error) {
          setSearchedBook([]);
        } else {
          if (data.length) {
            data.forEach((res) => {
              books && books.forEach((book) => {
                if (res.id === book.id) {
                  res["shelf"] = book.shelf;
                }
              });
            });
            setSearchedBook(data);
          } else {
            setSearchedBook([]);
          }
        }
      }).catch((error) => {
        console.log(error);
      });
    } else {
      setSearchedBook([]);
    }
  }

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link
          to='/'
          className="close-search"
        >
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchQuery}
            onChange={(e) => searchBooks(e.target.value)}
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {searchedBook && searchedBook.map((book) => {
            return <BookDetails key={book.id} book={book} updateBookByShelf={(book, updatedShelf) =>
              updateBookOldCategory(book, updatedShelf)
            } />
          })}
        </ol>
      </div>
    </div>
  )
}

export default SearchBook

SearchBook.propTypes = {
  books: PropTypes.array.isRequired,
  updateBookByShelf: PropTypes.func.isRequired,
};
