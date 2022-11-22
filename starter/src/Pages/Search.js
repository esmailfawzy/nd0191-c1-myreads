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
    if (searchInput?.length > 0) {
      const res = await search(searchInput + "");
      if (res) {
        const on_shelves = await getAll();
        // setAllBooks(res);
        let temp_res = res;

        // temp_res.map((book, id) => {
        //   const bookOnShelf = on_shelves.find((b) => b.id === book.id);
        //   if (bookOnShelf.shelf !== "") {
        //     book.shelf = bookOnShelf.shelf;
        //     console.log("map_res: ", bookOnShelf);
        //   }
        //   return book;
        // });
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
        // books_result.map((book, ind) => {
        //   const temp_book = on_shelves.find((b) => b.id === book.id);
        //   if (temp_book) {
        //     console.log("book", book);
        //     book.shelf = temp_book.shelf;
        //     // return setAllBooks(allBooks.splice(ind, 1, temp_book));
        //   }
        //   return book;
        // });
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
          <Throttle time="300" handler="onChange">
            <input
              onChange={(e) => {
                e.preventDefault();
                getAllBooks(e.target.value);
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
              console.log("book from search :", book);
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
