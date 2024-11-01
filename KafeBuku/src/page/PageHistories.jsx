import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function Histories() {
  const [histories, setHistories] = useState([]);

  
  const fetchHistories = async () => {
    try {
      const { data } = await axios.get("http://localhost:3001/user/histories", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      setHistories(data);
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response ? error.response.data.message : "Something went wrong!",
      });
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  return (
    <div className="container my-5" style={{ backgroundColor: '#D8CFC4', borderRadius: '8px', padding: '20px' }}>
      <h2 className="text-center" style={{ color: '#6F4C3E' }}>Histories</h2>
      {histories.length > 0 ? (
        <table className="table table-striped mt-4" style={{ backgroundColor: '#F5F5DC' }}>
          <thead style={{ backgroundColor: '#C7BBA2' }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history, index) => (
              <tr key={history.id} style={{ backgroundColor: index % 2 === 0 ? '#FAEBD7' : '#F5F5DC' }}>
                <th scope="row">{index + 1}</th>
                <td>{history.title}</td>
                <td>{new Date(history.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center">
          <p>No histories found</p>
        </div>
      )}
    </div>
  );
}
