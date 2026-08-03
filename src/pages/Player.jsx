import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/player.css";

function Player() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
        );

        if (!response.ok) {
          throw new Error("Unable to load book.");
        }

        const data = await response.json();
        setBook(data);
      } catch (error) {
        console.error(error);
        setError("Unable to load book.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

return (
  <main className="player-page">
    <aside className="player-sidebar">
      <img src={book.imageLink} alt={book.title} />

      <h2>{book.title}</h2>
      <p>{book.author}</p>
      <p>⭐ {book.averageRating}</p>
    </aside>

    <section className="player-content">
      <h1>{book.title}</h1>
      <h2>{book.author}</h2>

      <p>{book.summary}</p>

      <audio controls>
        <source src={book.audioLink} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </section>
  </main>
);
}

export default Player;