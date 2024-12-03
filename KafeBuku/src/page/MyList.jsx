import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchNovelByUserId } from "../novel/novelslice";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";
import Swal from "sweetalert2";


export default function MyListPage() {
  const dispatch = useDispatch();
  const myBooks = useSelector((state) => state.novel.items);
  const loading = useSelector((state) => state.novel.loading);

  const [isModalOpen, setModalOpen] = useState(false);
  const [generatedStory, setGeneratedStory] = useState("");

  useEffect(() => {
    dispatch(fetchNovelByUserId());
  }, [dispatch]);

  const handleOnReturn = async (bookId) => {
    try {

      await axios.delete(`http://localhost:3001/user/returnbook/${bookId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });

      await axios.put(`http://localhost:3001/user/returningbook/${bookId}`, {}, 
        {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });


      dispatch(fetchNovelByUserId());
    } catch (error) {
      console.log(error)
      Swal.fire({
        text: error.response ? error.response.data.message : 'Something went wrong!',
      });
    }
  };


  const handleGenerateStory = async (title, description) => {
    try {

      console.log(title, description)

      const prompt = `Buat cerita dengan judul "${title}" dengan deskripsi ${description} dalam bahasa Indonesia dengan panjang kata maksimal 500`;
      const genAI = new GoogleGenerativeAI("AIzaSyD4yrciJlQ4vU0HKgWo8x4PQBL6mWhrmVk");
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);

      console.log(prompt);
      

      
      
      const fulltext = result.response.candidates[0].content.parts[0].text
      console.log('ini result',fulltext);
      
      

      setGeneratedStory(fulltext);
      console.log('yang ini',generatedStory);
      
      setModalOpen(true);
    } catch (error) {
      Swal.fire({
        text: error.response ? error.response.data.message : 'Something went wrong!',
      });
      setGeneratedStory("Failed to generate story. Please try again.");
      setModalOpen(true);
    }
  };

  

  return (
    <div className="container my-5" style={{ backgroundColor: '#8B4513', color: 'white', borderRadius: '8px', padding: '20px' }}>
      <h2 className="text-center">My Borrowed Books</h2>
      {loading ? (
        <p>Loading books...</p>
      ) : (
        <div className="row g-4 justify-content-center">
          {myBooks.map((novel) => (
            <div key={novel.id} className="col-md-6 col-lg-4 d-flex align-items-stretch">
              <div className="card shadow-sm" style={{ width: "100%", backgroundColor: '#F5F5DC' }}>
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title text-truncate">{novel.title}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{novel.author}</h6>
                  <div className="mt-auto">
                    <span className="badge bg-success mb-2">{novel.status}</span>
                    <button
                      className="btn btn-danger w-100 mb-2"
                      onClick={() => handleOnReturn(novel.bookId)}
                    >
                      Return
                    </button>
                    <button
                      className="btn btn-info w-100"
                      onClick={() => handleGenerateStory(novel.title, novel.description)}
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
            <div className="modal-content" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="modal-header">
                <h5 className="modal-title">Generated Story</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setModalOpen(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{JSON.stringify(generatedStory)}</p>
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
  );
}
