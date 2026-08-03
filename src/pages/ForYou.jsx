import { useEffect, useState } from "react";

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

        setSelectedBook(
          Array.isArray(selectedData) ? selectedData[0] : selectedData
        );
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
    <main>
      <h1>For You</h1>

      <section>
        <h2>Selected Book</h2>

        {selectedBook ? (
          <div>
            <img
              src={selectedBook.imageLink}
              alt={selectedBook.title}
              width="200"
            />

            <h3>{selectedBook.title}</h3>
            <p>{selectedBook.author}</p>
            <p>{selectedBook.subTitle}</p>
            <p>Rating: {selectedBook.averageRating}</p>

            {selectedBook.subscriptionRequired && <span>Premium</span>}
          </div>
        ) : (
          <p>No selected book was found.</p>
        )}
      </section>

      <section>
        <h2>Recommended Books</h2>

        {recommendedBooks.map((book) => (
          <div key={book.id}>
            <img src={book.imageLink} alt={book.title} width="150" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.subTitle}</p>
            <p>Rating: {book.averageRating}</p>

            {book.subscriptionRequired && <span>Premium</span>}
          </div>
        ))}
      </section>

      <section>
        <h2>Suggested Books</h2>

        {suggestedBooks.map((book) => (
          <div key={book.id}>
            <img src={book.imageLink} alt={book.title} width="150" />
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <p>{book.subTitle}</p>
            <p>Rating: {book.averageRating}</p>

            {book.subscriptionRequired && <span>Premium</span>}
          </div>
        ))}
      </section>
    </main>
  );
}

export default ForYou;