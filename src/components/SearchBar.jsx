import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function SearchBar() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!search.trim()) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(async () => {
      try {
        setLoading(true);

        const response = await fetch(
          `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${encodeURIComponent(
            search
          )}`
        );

        const data = await response.json();
        setResults(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Unable to search books:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [search]);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by title or author"
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {search && (
        <div className="search-results">
          {loading && <p>Searching...</p>}

          {!loading && results.length === 0 && (
            <p>No books found.</p>
          )}

          {!loading &&
            results.map((book) => (
              <Link
                key={book.id}
                to={`/book/${book.id}`}
                className="search-result"
                onClick={() => {
                  setSearch("");
                  setResults([]);
                }}
              >
                <img src={book.imageLink} alt={book.title} />

                <div>
                  <strong>{book.title}</strong>
                  <p>{book.author}</p>
                </div>
              </Link>
            ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;