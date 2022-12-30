import React from 'react';

function ShelfDropdown({ onChangeShelf, booksCategory }) {
  const changeShelf = (newShelf) => {
    if (onChangeShelf) {
      onChangeShelf(newShelf);
    }
  };
  return (
    <div className="book-shelf-changer">
      <select value={booksCategory}
        onChange={(event) => {
          changeShelf(event.target.value)
        }}>
        <option value="none" disabled>
          Move to...
        </option>
        <option value="currentlyReading">
          Currently Reading
        </option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  )
}

export default ShelfDropdown
