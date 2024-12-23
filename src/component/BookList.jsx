import PropTypes from 'prop-types';

const BookList = ({ novels, onBorrow }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {novels.map((novel) => {
        return (
          <div key={novel.rank} className="border bg-white shadow-md rounded p-4 flex flex-col h-full">
            <img
              src={novel.book_image}
              className="w-full aspect-[3/4] object-cover mb-2"
              alt={novel.title}
            />
            <h3 className="text-lg font-bold text-black mb-1">{novel.title}</h3>
            <p className="text-sm text-pink-700 mb-2">{novel.author}</p>
 
            <p className="text-sm text-black mb-3">{novel.description}</p>

            <div className="mt-auto flex justify-center">

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
}

BookList.propTypes = {
  novels: PropTypes.arrayOf(
    PropTypes.shape({
      rank: PropTypes.number.isRequired,
      book_image: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      status: PropTypes.string.isRequired,
    })
  ).isRequired,
  onBorrow: PropTypes.func.isRequired,
};



export default BookList;
