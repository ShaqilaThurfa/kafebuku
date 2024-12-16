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
    <div
      className="flex flex-col justify-between"
      style={{ minHeight: "100vh", backgroundImage: `url(${bgbuku})` }}
    >
      <div className="d-flex flex-col p-4">
        <h1 className="text-center text-3xl text-white font-bold mb-3">
          Welcome to KafeBuku
        </h1>

        <div className="bg-[#8B4513] bg-opacity-70 p-4 rounded-lg max-w-md mx-auto mb-4">
          <h6 className="text-center text-white text-md mb-3 font-bold">
            Need a recommendation?
          </h6>
          <GeminiChat novels={novels} />
        </div>

        <h1 className="text-center text-2xl font-bold mb-4 text-light">
          Popular Young Adult Novels
        </h1>
      </div>

      <div className="text-white px-10 flex-grow">
        <div className="container my-2">
          <div className="row g-4 justify-content-center">
            {loading ? (
              <p className="text-center">Loading novels...</p>
            ) : (
              <BookList novels={novels} onBorrow={handleOnBorrow} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
