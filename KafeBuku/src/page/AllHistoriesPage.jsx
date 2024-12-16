import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function AllHistories() {
  const [histories, setHistories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:3001/admin/all-histories",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        setHistories(data);
        console.log(data);
      } catch (error) {
        Swal.fire({
          icon: "error",
          text: error.response
            ? error.response.data.message
            : "Something went wrong!",
        });
        navigate("/");
      }
    };

    fetchHistories();
  }, [navigate]);

  return (
    <div className="container mx-auto px-4 mt-8">
      <h1 className="text-3xl font-bold text-center mb-6">All Histories</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-200 shadow-lg">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-200 px-4 py-2 text-left">#</th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Title
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                User
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Borrowed At
              </th>
              <th className="border border-gray-200 px-4 py-2 text-left">
                Returned At
              </th>
            </tr>
          </thead>
          <tbody>
            {histories.length > 0 ? (
              histories.map((history, index) => (
                <tr
                  key={index}
                  className="hover:bg-gray-50 transition duration-200"
                >
                  <td className="border border-gray-200 px-4 py-2">
                    {index + 1}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {history.title}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {history.user?.fullName || "Unknown User"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {history.borrowed_at
                      ? new Date(history.borrowed_at).toLocaleDateString(
                          "idn-ID"
                        )
                      : "-"}
                  </td>
                  <td className="border border-gray-200 px-4 py-2">
                    {history.returned_at ? (
                      new Date(history.returned_at).toLocaleDateString("idn-ID")
                    ) : (
                      <span className="text-red-500 font-semibold">
                        Not yet returned
                      </span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center border border-gray-200 px-4 py-2"
                >
                  No histories available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
