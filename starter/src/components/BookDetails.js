import React from 'react'
import ShelfDropdown from './ShelfDropdown'

function BookDetails({book}) {
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
                          <ShelfDropdown/>
                        </div>
                        <div className="book-title">{book.title}</div>
                        <div className="book-authors">{book.authors}</div>
                      </div>
                    </li>
  )
}

export default BookDetails
