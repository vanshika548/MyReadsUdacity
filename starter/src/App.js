import "./App.css";
import ListOfBooks from "./components/ListOfBooks";
import SearchBook from "./components/SearchBook";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {

  return (
    <div className="app">
    <BrowserRouter>
        <Routes>
          <Route path="/search" element={<SearchBook/>}></Route>
          <Route path='/' element={<ListOfBooks/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
