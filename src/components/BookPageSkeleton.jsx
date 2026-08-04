function BookPageSkeleton() {
  return (
    <main className="book-page">
      <div className="book-container">
        <div className="book-page-skeleton-image skeleton"></div>

        <div className="book-info">
          <div className="book-page-skeleton-title skeleton"></div>
          <div className="book-page-skeleton-author skeleton"></div>
          <div className="book-page-skeleton-text skeleton"></div>
          <div className="book-page-skeleton-text skeleton"></div>
          <div className="book-page-skeleton-text short skeleton"></div>
        </div>
      </div>
    </main>
  );
}

export default BookPageSkeleton;