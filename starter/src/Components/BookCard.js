import React from "react";
import "../App.css";
const BookCard = ({ book, handleUpdate }) => {
  return (
    <div className="book">
      <div className="book-top">
        <div
          className="book-cover"
          style={{
            width: 128,
            height: 192,
            backgroundImage: `url('${book?.imageLinks?.thumbnail}')`,
          }}
        ></div>
        <div className="book-shelf-changer">
          <select
            value={book?.shelf || "none"}
            onChange={(e) => {
              e.preventDefault();
              handleUpdate(book, e.target.value);
            }}
          >
            <option value="none" disabled>
              {book?.shelf ? `Move to...` : `Add to...`}
            </option>
            <option value="currentlyReading">Currently Reading</option>
            <option value="wantToRead">Want to Read</option>
            <option value="read">Read</option>
            {book?.shelf && <option value="none">None</option>}
          </select>
        </div>
      </div>
      <div className="book-title">{book?.title}</div>
      <div className="book-authors">{book?.authors}</div>
    </div>
  );
};

export default BookCard;
