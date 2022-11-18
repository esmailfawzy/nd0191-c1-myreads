import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { search, update } from "../BooksAPI";
import BookCard from "../Components/BookCard";
const Search = () => {
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);

  const getAllBooks = async (searchInput = "") => {
    if (searchInput?.length > 0) {
      const res = await search(searchInput + "");
      if (res) {
        setAllBooks(res);
      } else {
        setAllBooks([]);
      }
    } else return;
  };

  const handleUpdate = async (book, shelf) => {
    const res = await update(book, shelf);
    console.log("res from search update", res);
    navigate("/");
  };

  return (
    <div className="search-books">
      <div className="search-books-bar">
        <Link to={"/"} className="close-search">
          Close
        </Link>
        <div className="search-books-input-wrapper">
          <input
            onChange={(e) => {
              e.preventDefault();
              getAllBooks(e.target.value);
            }}
            type="text"
            placeholder="Search by title, author, or ISBN"
          />
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {allBooks.length > 0 &&
            allBooks.map((book) => (
              <li key={`book-${book?.id}-${book?.name}`}>
                <BookCard book={book} handleUpdate={handleUpdate} />
              </li>
            ))}
        </ol>
      </div>
    </div>
  );
};

export default Search;
