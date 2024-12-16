const BookList = ({ novels, onBorrow }) => {
 

  return (
    <div className="book-list grid grid-cols-1 md:grid-cols-2 gap-4">
      {novels.map((novel) => {

        return (
          <div key={novel.rank} className="book-card border rounded p-4">
            <img
              src={novel.book_image}
              className="w-full h-48 object-cover mb-2"
              alt={novel.title}
            />
            <h3 className="text-lg font-bold">{novel.title}</h3>
            <p>{novel.author}</p>
            <p className="text-sm text-white-600">{novel.description}</p>

            <div className="d-flex flex-column align-items-start gap-2">
            <span className="badge bg-success mb-2">
              {novel.status}
            </span>
            {novel.status === "available" ? (
                <button
                  className="btn btn-primary"
                  onClick={() => onBorrow(novel)}
                >
                  Borrow
                </button>
              ) : (
                <button className="btn btn-secondary" disabled>
                  Borrowed
                </button>
              )}
              </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookList;
