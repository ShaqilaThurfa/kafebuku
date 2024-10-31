import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovelByUserId, generateStoryWithAI } from "../novel/novelslice";
import axios from "axios";

export default function MyListPage() {
  const dispatch = useDispatch();
  const myBooks = useSelector((state) => state.novel.items);
  const loading = useSelector((state) => state.novel.loading);
  const generatedStory = useSelector((state) => state.novel.generatedStory);
  
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchNovelByUserId());
  }, [dispatch]);

  // Buka modal setelah generatedStory di-update
  useEffect(() => {
    if (generatedStory) {
      setModalOpen(true);
    }
  }, [generatedStory]);

  const handleGenerateStory = (title, author, description) => {
    dispatch(generateStoryWithAI(title, author, description));
  };

  const handleOnReturn = async (bookId) => {
    await axios.delete(`http://localhost:3001/user/returnbook/${bookId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    dispatch(fetchNovelByUserId());
  };

  return (
    <div>
      <h2>My Borrowed Books</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="container my-5">
          <h1 className="text-center mb-5 text-dark">
            Popular Young Adult Novels
          </h1>
          <div className="row g-4 justify-content-center">
            {myBooks.map((novel) => (
              <div
                key={novel.rank}
                className="col-md-6 col-lg-4 d-flex align-items-stretch"
              >
                <div className="card shadow-sm" style={{ width: "100%" }}>
                  <img
                    src={novel.book_image}
                    className="card-img-top"
                    alt={novel.title}
                  />
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title text-truncate">{novel.title}</h5>
                    <h6 className="card-subtitle mb-2 text-muted">
                      {novel.author}
                    </h6>
                    <p className="card-text" style={{ fontSize: "0.9rem" }}>
                      {novel.description}
                    </p>
                    <div className="mt-auto">
                      <span className="badge bg-success mb-2">
                        {novel.status}
                      </span>
                      <button
                        className="btn btn-primary w-100"
                        onClick={() => handleOnReturn(novel.rank)}
                      >
                        Return
                      </button>
                      <button
                        className="btn btn-primary w-100 mt-2"
                        onClick={() => handleGenerateStory(novel.title, novel.author, novel.description)}
                      >
                        Generate Story
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal untuk menampilkan cerita yang dihasilkan */}
          {isModalOpen && (
            <div className="modal show d-block" tabIndex="-1" role="dialog">
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Generated Story</h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={() => setModalOpen(false)}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <p>{generatedStory || "No story generated."}</p>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
