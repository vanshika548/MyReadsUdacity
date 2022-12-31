import "./App.css";
import { useState, useEffect } from "react";
import ListOfBooks from "./components/ListOfBooks";
import SearchBook from "./components/SearchBook";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";

function App() {

  const [books, setBooks] = useState([]);

  const myShelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
  ]

  const updateBookByShelf = (book, updatedShelf) => {
    const updateBook = () => {
      const id = books.findIndex((bookShelf) => {
        return bookShelf.id === book.id;
      });
      if (id >= 0) {
        let updatedBooksShelf = [...books];
        updatedBooksShelf[id].shelf = updatedShelf;
        setBooks(updatedBooksShelf);
      }
    };
    BooksAPI.getAll().then((data) => {
      setBooks(data);
    });
    updateBook();
  };

  // API call to get list of all books
  const getAllBooks = async () => {
    const data = await BooksAPI.getAll();
    setBooks(data);
  }

  useEffect(() => {
    getAllBooks();
  }, [])

  return (
    <div className="app">
      <BrowserRouter>
        <Routes>
          <Route path="/search" element={<SearchBook books={books} updateBookByShelf={(book, updatedShelf) =>
            updateBookByShelf(book, updatedShelf)
          } />}></Route>
          <Route path='/' element={<ListOfBooks books={books} myShelves={myShelves} updateBookByShelf={(book, updatedShelf) =>
            updateBookByShelf(book, updatedShelf)
          } />}></Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
