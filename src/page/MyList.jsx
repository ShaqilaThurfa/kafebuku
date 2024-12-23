import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovelByUserId, fetchSuccess } from "../novel/novelslice";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Swal from "sweetalert2";
import API_BASE_URL from "../config";

export default function MyListPage() {
  const dispatch = useDispatch();
  const myBooks = useSelector((state) => state.novel.items);
  const loading = useSelector((state) => state.novel.loading);

  const [title, setTitle] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");
  const [generatingBookId, setGeneratingBookId] = useState(null);

  useEffect(() => {
    dispatch(fetchNovelByUserId());
  }, [dispatch]);

  const handleOnReturn = async (bookId) => {
    try {
      dispatch(
        fetchSuccess(myBooks.filter((novel) => novel.bookId !== bookId))
      );

      await axios.put(
        `${API_BASE_URL}/user/returnbook/${bookId}`,
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

  const handleGenerateStory = async (bookId, title, description) => {
    try {
      setGeneratingBookId(bookId);
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
    } finally {
      setGeneratingBookId(null);
    }
  };

  return (
    <div className="container p-10 my-5 max-w-screen-lg bg-[#8B4513] text-white text-lg font-bold rounded-lg shadow-lg gap-y-8">
      {myBooks.length === 0 ? (
        <p>You haven&apos;t borrowed any books.</p>
      ) : (
        <>
          <h2 className="text-center mb-8">My Borrowed Books</h2>
          {loading ? (
            <p>Loading books...</p>
          ) : (
            <div className="flex flex-wrap gap-y-4 justify-center">
              {myBooks.map((novel) => (
                <div
                  key={novel.id}
                  className="flex card shadow-sm mx-3 w-full md:basis-1/2 lg:basis-1/4 max-w-sm bg-[#F5F5DC]"
                >
                  <div className="card-body flex flex-col">
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
                          handleGenerateStory(
                            novel.bookId,
                            novel.title,
                            novel.description
                          )
                        }
                        disabled={generatingBookId === novel.bookId} 
                      >
                        {generatingBookId === novel.bookId
                          ? "Generating..."
                          : "Generate Story"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-5 rounded-lg w-11/12 max-w-lg">
            <div className="flex justify-between items-center border-b pb-2">
              <h5 className="text-lg text-black font-bold">{title}</h5>
              <button
                className="text-red-500 font-bold"
                onClick={() => setModalOpen(false)}
              >
                X
              </button>
            </div>
            <div className="overflow-y-auto max-h-80 my-4 text-sm text-black font-normal justify-end">
              {generatingBookId ? (
                <p className="text-center text-gray-500">
                  Generating story, please wait...
                </p>
              ) : (
                <p>{generatedStory || "No story generated yet."}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
