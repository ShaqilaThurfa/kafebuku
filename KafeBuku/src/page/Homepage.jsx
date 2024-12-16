import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovels, fetchNovelByUserId } from "../novel/novelslice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import GeminiChat from "../component/gemini";
import bgbuku from "../bg/bgbuku.jpg";
import Swal from "sweetalert2";
import BookList from "../component/BookList";


export default function HomePage() {
  const dispatch = useDispatch();
  const novels = useSelector((state) => state.novel.items);
  const loading = useSelector((state) => state.novel.loading);
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchNovels());
  }, []);

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

      Swal.fire({
        text: "Book borrowed successfully!",
        icon: "success",
      });
      
      dispatch(fetchNovelByUserId());
      navigate("/mylist");
    } catch (error) {
      Swal.fire({
        text: error.response
          ? error.response.data.message
          : "Something went wrong!",
      });
    }
  };

  return (
    <div className="d-flex" style={{ minHeight: "100vh" }}>
      <div className="col-12 col-md-8 bg-[#8B4513] text-white p-5">
        <h3
          style={{
            fontSize: "1.5rem",
            textAlign: "center",
            textShadow: "1px 1px rgba(0, 0, 0, 0.3)",
            padding: "2px",
          }}
        >
          Welcome to our Library PageTurner! <br />
        </h3>

        <div className="container my-5">
          <h1 className="text-center mb-5 text-light">
            Popular Young Adult Novels
          </h1>
          <div className="row g-4 justify-content-center">
            {loading ? (
              <p className="text-center">Loading novels...</p>
            ) : (
              <BookList novels={novels} onBorrow={handleOnBorrow} />
            )}
          </div>
        </div>
      </div>

      <div
        className="flex flex-col w-full min-h-screen bg-[#F5F5DC]"
        style={{ backgroundImage: `url(${bgbuku})` }}
      >
        <div className="w-full h-screen">
          <h6 className="mt-8 mb-2 ml-24 text-white font-bold text-lg">
            Need a recommendation?
          </h6>
          <div className="flex flex-col items-center justify-center flex-1 overflow-auto">
            <GeminiChat novels={novels} />
          </div>
        </div>
      </div>

      <div className="block md:hidden bg-[#F5F5DC] p-4">
        <h6 className="text-center text-black mb-3">Need a recommendation?</h6>
        <GeminiChat novels={novels} />
      </div>
    </div>
  );
}
