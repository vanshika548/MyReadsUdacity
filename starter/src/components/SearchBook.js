import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import * as BooksAPI from '../BooksAPI';
import BookDetails from './BookDetails';

function SearchBook({ books, updateBookShelf }) {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchedBook, setSearchedBook] = useState([]);

// API call to update the shelf of particular book
  const updateBookCategory = (book, newShelf) => {
    const updateBook = () => {
      const id = searchedBook.findIndex((searchedBook) => {
        return searchedBook.id === book.id;
      });
      if (id >= 0) {
        let updatedBooks = [...searchedBook];
        updatedBooks[id].shelf = newShelf;
        updateBookShelf(book, newShelf);
        setSearchedBook(updatedBooks);
      }
    };
    updateBook();
  };

  // Search API to get searched book
  const searchBooks = (value) => {
    setSearchQuery(value);
    if (value.trim().length) {
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
        console.log("error", error)
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
            return <BookDetails key={book.id} book={book} updateBookShelf={(book, updatedShelf) =>
              updateBookCategory(book, updatedShelf)
            } />
          })}
        </ol>
      </div>
    </div>
  )
}

export default SearchBook
