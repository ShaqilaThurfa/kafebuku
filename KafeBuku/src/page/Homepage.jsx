import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovels } from "../novel/novelslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function HomePage() {
  const dispatch = useDispatch();
  const novels = useSelector((state) => state.novel.items);
  const loading = useSelector((state) => state.novel.loading);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchNovels());
  }, [dispatch]);

  const handleOnBorrow = async (novel) => {
    const bookData = {
      bookId: novel.rank,
      title: novel.title,
      author: novel.author,
      coverUrl: novel.book_image,
      description: novel.description,
    };

    try {
      await axios.post("http://localhost:3001/user/borrowbook", bookData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      console.log("Book borrowed successfully!");
    } catch (error) {
      console.error("Error borrowing book:", error);
    }

    navigate("/mylist");
  };

  return (
    <div
      className="d-flex flex-column flex-md-row"
      style={{ minHeight: "100vh", backgroundColor: "#8B4513" }}
    >
      
        <div
        className="col-12 col-md-4 position-relative d-flex flex-column align-items-center justify-content-center"
        style={{
          marginTop: "10vh",
          height: "40vh",
          // backgroundImage: `url(${})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <h3
          style={{
            // backgroundColor:"#DEB887",
            color: "white",
            fontSize: "1.5rem",
            textAlign: "center",
            textShadow: "5px 3px 5px rgba(0, 0, 0, 0.7)",
            padding: "2px",
            width:"400px"
          }}
        >
          Welcome to our Libary PageTurner! <br />
        </h3>
        
        <button
          className="btn mt-3"
          onClick={() => navigate("/mylist")}
          style={{
            backgroundColor: "#F5DEB3", 
            color: "black",
            border: "none",
            padding: "10px 20px",
            fontWeight: "bold",
            zIndex: 1,
            width: "400px"
          }}
        >
          My List
        </button>
      </div>

      <div className="col-12 col-md-8 bg-light d-flex align-items-center justify-content-center">
        <div className="container my-5">
          <h1 className="text-center mb-5 text-dark">
            Popular Young Adult Novels
          </h1>
          <div className="row g-4 justify-content-center">
            {loading ? (
              <p className="text-center">Loading novels...</p>
            ) : (
              novels.map((novel) => (
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
                      <h5 className="card-title text-truncate">
                        {novel.title}
                      </h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {novel.author}
                      </h6>
                      <p className="card-text" style={{ fontSize: "0.9rem" }}>
                        {novel.description}
                      </p>
                      <div className="mt-auto">
                        <span className="badge bg-success mb-2" name="status">Available</span>
                        <button
                          className="btn btn-primary w-100"
                          onClick={() => handleOnBorrow(novel)}
                        >
                          Borrow
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

    </div>
  );
}
