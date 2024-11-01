import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovels } from "../novel/novelslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeminiChat from '../component/gemini';
import NavBar from "../component/navbar";
import bgbuku from '../bg/bgbuku.jpg'; 
import Swal from "sweetalert2";


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
      navigate("/mylist");
    } catch (error) {
      Swal.fire({
        text: error.response ? error.response.data.message : 'Something went wrong!',
      });
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      
      <div
        className="col-12 col-md-8"
        style={{ backgroundColor: "#8B4513", color: "white", padding: "20px" }} 
      >
        <h3 style={{ fontSize: "1.5rem", textAlign: "center", textShadow: "1px 1px rgba(0, 0, 0, 0.3)", padding: "2px" }}>
          Welcome to our Library PageTurner! <br />
        </h3>

        <div className="container my-5">
          <h1 className="text-center mb-5 text-light">Popular Young Adult Novels</h1>
          <div className="row g-4 justify-content-center">
            {loading ? (
              <p className="text-center">Loading novels...</p>
            ) : (
              novels.map((novel) => (
                <div key={novel.rank} className="col-md-6 col-lg-4 d-flex align-items-stretch">
                  <div className="card shadow-sm" style={{ width: "100%" }}>
                    <img src={novel.book_image} className="card-img-top" alt={novel.title} />
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title text-truncate">{novel.title}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">{novel.author}</h6>
                      <p className="card-text" style={{ fontSize: "0.9rem" }}>{novel.description}</p>
                      <div className="mt-auto">
                        <span className="badge bg-success mb-2">Available</span>
                        <button className="btn btn-primary w-100" onClick={() => handleOnBorrow(novel)}>
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

      
      <div
        className="col-12 col-md-4"
        style={{ backgroundImage: `url(${bgbuku})`, backgroundColor: "#F5F5DC", padding: "50px", display: "flex", justifyContent: "center" }} // Cream background
      >
        <div
          style={{
            width: "90%",
            padding: "20px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            height: "100%",
            position: "relative",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <h6 style={{ textAlign: "center" }}>Need a recommendation?</h6>
          <GeminiChat />
        </div>
      </div>
    </div>
  );
}
