import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { getAll, update } from "../BooksAPI";
import BookCard from "../Components/BookCard";
import Shelf from "../Components/Shelf";
const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    const res = await getAll();
    setAllBooks(res);
    console.log("res", res);
  };

  const handleUpdate = async (book, shelf) => {
    const res = await update(book, shelf);
    console.log("res from home update", res);
    getAllBooks();
  };
  return (
    <div className="list-books">
      <div className="list-books-title">
        <h1>MyReads</h1>
      </div>
      <div className="list-books-content">
        <div>
          <Shelf title={"Currently Reading"}>
            {allBooks
              .filter((book) => book.shelf === "currentlyReading")
              .map((item) => (
                <li key={`book-${item?.id}-${item?.name}`}>
                  <BookCard book={item} handleUpdate={handleUpdate} />
                </li>
              ))}
          </Shelf>

          <Shelf title={"Want to Read"}>
            {allBooks
              .filter((book) => book.shelf === "wantToRead")
              .map((item) => (
                <li key={`book-${item?.id}-${item?.name}`}>
                  <BookCard book={item} handleUpdate={handleUpdate} />
                </li>
              ))}
          </Shelf>

          <Shelf title={"Read"}>
            {allBooks
              .filter((book) => book.shelf === "read")
              .map((item) => (
                <li key={`book-${item?.id}-${item?.name}`}>
                  <BookCard book={item} handleUpdate={handleUpdate} />
                </li>
              ))}
          </Shelf>
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"}>Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
