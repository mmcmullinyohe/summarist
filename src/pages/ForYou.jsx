import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/forYou.css";

function ForYou() {
  const [selectedBook, setSelectedBook] = useState(null);
  const [recommendedBooks, setRecommendedBooks] = useState([]);
  const [suggestedBooks, setSuggestedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBooks() {
      try {
        const [selectedResponse, recommendedResponse, suggestedResponse] =
          await Promise.all([
            fetch(
              "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
            ),
            fetch(
              "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
            ),
            fetch(
              "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
            ),
          ]);

        if (
          !selectedResponse.ok ||
          !recommendedResponse.ok ||
          !suggestedResponse.ok
        ) {
          throw new Error("Unable to load books.");
        }

        const selectedData = await selectedResponse.json();
        const recommendedData = await recommendedResponse.json();
        const suggestedData = await suggestedResponse.json();

        setSelectedBook(selectedData[0]);
        setRecommendedBooks(
          Array.isArray(recommendedData) ? recommendedData : []
        );
        setSuggestedBooks(
          Array.isArray(suggestedData) ? suggestedData : []
        );
      } catch (error) {
        console.error("Unable to fetch books:", error);
        setError("Unable to load books.");
      } finally {
        setLoading(false);
      }
    }

    fetchBooks();
  }, []);

  if (loading) {
    return <h1>Loading books...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <main className="for-you">
      <h1>For You</h1>

<section>
  <h2>Selected Book</h2>

  {selectedBook && (
    <Link
      to={`/book/${selectedBook.id}`}
      className="selected-book"
    >
      <img
        src={selectedBook.imageLink}
        alt={selectedBook.title}
      />

      <div className="selected-book-info">
        <h3>{selectedBook.title}</h3>
        <p>{selectedBook.author}</p>
        <p>{selectedBook.subTitle}</p>
        <p>⭐ {selectedBook.averageRating}</p>

        {selectedBook.subscriptionRequired && (
          <span className="premium-badge">Premium</span>
        )}
      </div>
    </Link>
  )}
</section>

      <section>
  <h2>Recommended Books</h2>

  <div className="book-row">
    {recommendedBooks.map((book) => (
      <Link
  to={`/book/${book.id}`}
  className="book-card"
  key={book.id}
>
        <img src={book.imageLink} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.subTitle}</p>
        <p>Rating: {book.averageRating}</p>

        {book.subscriptionRequired && <span>Premium</span>}
      </Link>
    ))}
  </div>
</section>

<section>
  <h2>Suggested Books</h2>

  <div className="book-row">
    {suggestedBooks.map((book) => (
      <Link
  to={`/book/${book.id}`}
  className="book-card"
  key={book.id}
>
        <img src={book.imageLink} alt={book.title} />
        <h3>{book.title}</h3>
        <p>{book.author}</p>
        <p>{book.subTitle}</p>
        <p>Rating: {book.averageRating}</p>

        {book.subscriptionRequired && <span>Premium</span>}
      </Link>
    ))}
  </div>
</section>
    </main>
  );
}

export default ForYou;