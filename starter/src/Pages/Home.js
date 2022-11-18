import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";
import { getAll, update } from "../BooksAPI";
import BookCard from "../Components/BookCard";
const Home = () => {
  const [allBooks, setAllBooks] = useState([]);
  useEffect(() => {
    getAllBooks();
  }, []);

  const getAllBooks = async () => {
    const res = await getAll();
    setAllBooks(res);
    console.log("res from home", res);
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
          <div className="bookshelf">
            <h2 className="bookshelf-title">Currently Reading</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {allBooks
                  .filter((book) => book.shelf === "currentlyReading")
                  .map((item) => (
                    <li key={`book-${item?.id}-${item?.name}`}>
                      <BookCard book={item} handleUpdate={handleUpdate} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Want to Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {allBooks
                  .filter((book) => book.shelf === "wantToRead")
                  .map((item) => (
                    <li key={`book-${item?.id}-${item?.name}`}>
                      <BookCard book={item} handleUpdate={handleUpdate} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
          <div className="bookshelf">
            <h2 className="bookshelf-title">Read</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {allBooks
                  .filter((book) => book.shelf === "read")
                  .map((item) => (
                    <li key={`book-${item?.id}-${item?.name}`}>
                      <BookCard book={item} handleUpdate={handleUpdate} />
                    </li>
                  ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="open-search">
        <Link to={"/search"}>Add a book</Link>
      </div>
    </div>
  );
};

export default Home;
