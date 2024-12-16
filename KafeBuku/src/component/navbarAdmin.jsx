import { Link, useLocation } from "react-router-dom";

export default function NavBarAdmin() {
  const location = useLocation();
  const activeTab = location.pathname === "/all-histories" ? "histories" : "all-users";

  return (
    <>
      <div className="flex items-center justify-center mt-7">
        <div className="flex space-x-6 text-center text-green-500">
          
          <Link
            to="/all-users"
            className={`font-semibold pb-1 rounded-md px-3 ${
              activeTab === "all-users" ? "bg-green-500 text-white" : "hover:bg-green-100"
            }`}
          >
            All User
          </Link>

          
          <Link
            to="/all-histories"
            className={`font-semibold pb-1 rounded-md px-3 ${
              activeTab === "histories" ? "bg-green-500 text-white" : "hover:bg-green-100"
            }`}
          >
            Histories
          </Link>
        </div>
      </div>
    </>
  );
}
