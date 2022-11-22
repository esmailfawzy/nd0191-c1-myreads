import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import { Throttle } from "react-throttle";
import { getAll, search, update } from "../BooksAPI";
import BookCard from "../Components/BookCard";

const Search = () => {
  const navigate = useNavigate();
  const [allBooks, setAllBooks] = useState([]);

  const getAllBooks = async (searchInput = "") => {
    const on_shelves = await getAll();
    if (searchInput.length > 0) {
      const res = await search(searchInput + "");
      if (res) {
        console.log(res);
        let temp_res = res;

        if (res.error !== "empty query") {
          temp_res.map((item) => {
            on_shelves.map((b) => {
              if (b.id === item.id) {
                item.shelf = b.shelf;
              }
              return b;
            });

            return item;
          });
          setAllBooks(temp_res);
        } else {
          setAllBooks([]);
        }
      } else {
        setAllBooks([]);
      }
    }
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
          <Throttle time="200" handler="onChange">
            <input
              onChange={(e) => {
                e.preventDefault();
                getAllBooks(e.target.value.trim());
              }}
              type="text"
              placeholder="Search by title, author, or ISBN"
            />
          </Throttle>
        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {allBooks.length > 0 &&
            allBooks.map((book) => {
              // console.log("book from search :", book);
              return (
                <li key={`book-${book?.id}-${book?.name}`}>
                  <BookCard book={book} handleUpdate={handleUpdate} />
                </li>
              );
            })}
        </ol>
      </div>
    </div>
  );
};

export default Search;
