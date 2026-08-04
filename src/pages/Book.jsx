import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/book.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";

function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
const { user, openAuthModal } = useAuth();
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

function handleBookAccess() {
  if (!user) {
    openAuthModal();
    return;
  }

  const isSubscribed =
    user.subscription === "premium" ||
    user.subscription === "premium-plus";

  if (book.subscriptionRequired && !isSubscribed) {
    navigate("/choose-plan");
    return;
  }

  navigate(`/player/${book.id}`);
}

if (loading) {
  return <h1>Loading...</h1>;
}

if (!book) {
  return <h1>Book not found.</h1>;
}

return (
  <>
    <Navbar />
    <SearchBar />

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
              onClick={handleBookAccess}
            >
              Read
            </button>

            <button
              className="book-action-button"
              onClick={handleBookAccess}
            >
              Listen
            </button>
          </div>

          <p>{book.bookDescription}</p>
        </div>
      </div>
    </main>
  </>
);
}

export default Book;