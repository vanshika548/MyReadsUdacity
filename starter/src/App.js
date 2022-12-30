import "./App.css";
import { useState, useEffect } from "react";
import ListOfBooks from "./components/ListOfBooks";
import SearchBook from "./components/SearchBook";
import * as BooksAPI from "./BooksAPI";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  const [books, setBooks] = useState([]);

  const myShelves = [
    { key: 'currentlyReading', name: 'Currently Reading' },
    { key: 'wantToRead', name: 'Want to Read' },
    { key: 'read', name: 'Read' }
  ]

  // API call to get list of all books
  const getAllBooks = async () => {
    const data = await BooksAPI.getAll();
    console.log("data",data)
    setBooks(data);
  }

  useEffect(() => {
    getAllBooks();
  }, [])

  return (
    <div className="app">
    <BrowserRouter>
        <Routes>
          <Route path="/search" element={<SearchBook/>}></Route>
          <Route path='/' element={<ListOfBooks books={books} myShelves={myShelves}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
