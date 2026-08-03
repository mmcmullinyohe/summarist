import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/book.css";

function Book() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
const [loading, setLoading] = useState(true);

useEffect(() => {
  async function fetchBook() {
    const response = await fetch(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );

    const data = await response.json();

    setBook(data);
    setLoading(false);
  }

  fetchBook();
}, [id]);

if (loading) {
  return <h1>Loading...</h1>;
}

return (
  <main className="book-page">
    <div className="book-container">
      <img src={book.imageLink} alt={book.title} />

      <div className="book-info">
        <h1>{book.title}</h1>
        <h2>{book.author}</h2>
        <p>{book.subTitle}</p>
        <p>⭐ {book.averageRating}</p>
        <div className="book-actions">
  <button
    className="book-action-button"
    onClick={() => window.location.href = `/player/${book.id}`}
  >
    Read
  </button>

  <button
    className="book-action-button"
    onClick={() => window.location.href = `/player/${book.id}`}
  >
    Listen
  </button>
</div>
        <p>{book.bookDescription}</p>
      </div>
    </div>
  </main>
);
}

export default Book;