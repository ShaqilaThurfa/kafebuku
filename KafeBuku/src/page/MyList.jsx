import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovelByUserId, fetchSuccess } from "../novel/novelslice";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Swal from "sweetalert2";

export default function MyListPage() {
  const dispatch = useDispatch();
  const myBooks = useSelector((state) => state.novel.items);
  const loading = useSelector((state) => state.novel.loading);

  const [title, setTitle] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");

  useEffect(() => {
    dispatch(fetchNovelByUserId());
  }, [dispatch]);

  const handleOnReturn = async (bookId) => {
    try {

      dispatch(fetchSuccess(myBooks.filter((novel) => novel.bookId !== bookId)));

      await axios.put(
        `http://localhost:3001/user/returnbook/${bookId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );

      dispatch(fetchNovelByUserId());
      Swal.fire({
        text: "Book has been returned",
        icon: "success",
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        text: error.response
          ? error.response.data.message
          : "Something went wrong!",
      });
    }
  };

  const handleGenerateStory = async (title, description) => {
    try {
      setTitle(title);
      const prompt = `Buat cerita dengan judul "${title}" dengan deskripsi ${description} dalam bahasa Indonesia dengan panjang kata maksimal 500 kata, jangan sertakan judul, penulis dan deskripsi dalam cerita.`;
      const genAI = new GoogleGenerativeAI(
        "AIzaSyD4yrciJlQ4vU0HKgWo8x4PQBL6mWhrmVk"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      const fulltext = result.response.candidates[0].content.parts[0].text;

      setGeneratedStory(fulltext);

      setModalOpen(true);
    } catch (error) {
      Swal.fire({
        text: error.response
          ? error.response.data.message
          : "Something went wrong!",
      });
      setGeneratedStory("Failed to generate story. Please try again.");
      setModalOpen(true);
    }
  };

  return (
    <div
      className="container mx-auto px-5 my-5 max-w-full overflow-x-hidden" 
      style={{
        backgroundColor: "#8B4513",
        color: "white",
        borderRadius: "8px",
        padding: "20px",
      }}
    >
      <h2 className="text-center">My Borrowed Books</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="row g-4 justify-content-center">
          {myBooks.map((novel) => (
            <div
              key={novel.id}
              className="col-md-6 col-lg-4 d-flex align-items-stretch"
            >
              <div
                className="card shadow-sm mx-auto w-full max-w-[80%] bg-[#F5F5DC]"
              >
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{novel.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    {novel.author}
                  </h6>
                  <div className="mt-auto">
                    <span className="badge bg-success mb-2">
                      {novel.status}
                    </span>
                    <button
                      className="btn btn-danger w-100 mb-2"
                      onClick={() => handleOnReturn(novel.bookId)}
                    >
                      Return
                    </button>
                    <button
                      className="btn btn-info w-100"
                      onClick={() =>
                        handleGenerateStory(novel.title, novel.description)
                      }
                    >
                      Generate Story
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div
              className="modal-content"
              style={{ backgroundColor: "#8B4513" }}
            >
              <div className="modal-header">
                <h5
                  className="modal-title"
                  style={{ color: "#ffff" }}
                >
                  {title}
                </h5>
                <button
                  type="button"
                  className="btn-close white"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div
                className="modal-body"
                style={{
                  maxHeight: "400px",
                  overflowY: "auto",
                  padding: "20px",
                  backgroundColor: "#f9f9f9",
                  color: "#000",
                }}
              >
                <p>{generatedStory || "No story generated yet."}</p>
              </div>

              <div className="modal-footer">
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
