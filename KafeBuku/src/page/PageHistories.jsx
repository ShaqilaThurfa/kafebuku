import { useEffect, useState } from "react";
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
    <div className="container p-10 my-5 max-w-screen-lg bg-[#8B4513] rounded-lg shadow-lg">
      <h2 className="text-center mb-8 text-white text-lg font-bold">My History</h2>
      {histories.length > 0 ? (
        <table className="table table-striped mt-4 bg-[#F5F5DC]">
          <thead style={{ backgroundColor: '#C7BBA2' }}>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Title</th>
              <th scope="col">Borrowed at</th>
              <th scope="col">Returned at</th>
            </tr>
          </thead>
          <tbody>
            {histories.map((history, index) => (
              <tr key={history.id} style={{ backgroundColor: index % 2 === 0 ? '#FAEBD7' : '#F5F5DC' }}>
                <th scope="row">{index + 1}</th>
                <td>{history.title}</td>
                <td>{new Date(history.borrowed_at).toLocaleDateString('idn-ID')}</td>
                <td className="border border-gray-200 py-2">
                    {history.returned_at ? (
                      new Date(history.returned_at).toLocaleDateString("idn-ID")
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Not yet returned
                      </span>
                    )}
                  </td>
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
