import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/player.css";
import SearchBar from "../components/SearchBar";
import Sidebar from "../components/Sidebar";

function Player() {
  const { id } = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  const audioRef = useRef(null);

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
        console.error("Unable to fetch book:", error);
        setError("Unable to load book.");
      } finally {
        setLoading(false);
      }
    }

    fetchBook();
  }, [id]);

  function handleListen() {
    if (!audioRef.current) {
      return;
    }

    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Unable to play audio:", error);
      });
  }

  function handleRead() {
    if (!audioRef.current) {
      return;
    }

    audioRef.current.pause();
    setIsPlaying(false);
  }

if (loading) {
  return (
    <>
      <Navbar />
      <SearchBar />

      <div className="app-layout">
        <Sidebar />

        <main className="player-page">
          <aside className="player-sidebar">
            <div className="player-loading-cover"></div>
            <div className="player-loading-heading"></div>
            <div className="player-loading-short"></div>
          </aside>

          <section className="player-content">
            <div className="player-loading-title"></div>
            <div className="player-loading-short"></div>

            <div className="player-loading-line"></div>
            <div className="player-loading-line"></div>
            <div className="player-loading-line"></div>
            <div className="player-loading-line player-loading-line-short"></div>
          </section>
        </main>
      </div>
    </>
  );
}

  if (error) {
    return <h1>{error}</h1>;
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


      <main className="player-page">
        <aside className="player-sidebar">
          <img src={book.imageLink} alt={book.title} />

          <h2>{book.title}</h2>
          <p>{book.author}</p>
          <p className="player-rating">⭐ {book.averageRating}</p>

          <div className="player-buttons">
            <button className="read-btn" onClick={handleRead}>
              Read
            </button>

            <button className="listen-btn" onClick={handleListen}>
              {isPlaying ? "Playing..." : "Listen"}
            </button>
          </div>
        </aside>

        <section className="player-content">
          <h1>{book.title}</h1>
          <h2>{book.author}</h2>

          <p>{book.summary}</p>

          <audio
            ref={audioRef}
            controls
            src={book.audioLink}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          >
            Your browser does not support the audio element.
          </audio>
        </section>
      </main>
      </div>
    </>
  );
}

export default Player;