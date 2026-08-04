import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/book.css";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";


function Book() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, openAuthModal } = useAuth();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBook() {
      const response = await fetch(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`,
      );

      const data = await response.json();

      setBook(data);
      setLoading(false);
    }

    fetchBook();
  }, [id]);

function handleBookAccess() {
  const isPremiumBook = book.subscriptionRequired === true;

  if (!isPremiumBook) {
    navigate(`/player/${book.id}`);
    return;
  }

  if (!user) {
    openAuthModal();
    return;
  }

  const isSubscribed =
    user.subscription === "premium" ||
    user.subscription === "premium-plus";

  if (!isSubscribed) {
    navigate("/choose-plan");
    return;
  }

  navigate(`/player/${book.id}`);
}

 if (loading) {
  return (
    <>
      <Navbar />
      <SearchBar />

      <div className="app-layout">
        <Sidebar />

        <main className="book-page">
          <div className="book-container">
            <div className="book-loading-cover"></div>

            <div className="book-info">
              <div className="book-loading-title"></div>
              <div className="book-loading-line book-loading-line-short"></div>
              <div className="book-loading-line"></div>
              <div className="book-loading-line"></div>
              <div className="book-loading-line"></div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

  if (!book) {
    return <h1>Book not found.</h1>;
  }

  return (
    <>
      <Navbar />
      <SearchBar />

      <div className="app-layout">
        <Sidebar />

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

              <p className="book-description">{book.bookDescription}</p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Book;
