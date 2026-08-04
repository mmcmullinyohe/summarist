function BookSkeleton() {
  return (
    <div className="book-card skeleton-card">
      <div className="skeleton skeleton-image"></div>
      <div className="skeleton skeleton-title"></div>
      <div className="skeleton skeleton-text"></div>
      <div className="skeleton skeleton-text skeleton-text-short"></div>
    </div>
  );
}

export default BookSkeleton;