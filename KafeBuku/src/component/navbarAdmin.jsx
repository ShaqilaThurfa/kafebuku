import { useState } from "react";

export default function NavBarAdmin() {
  const [activeTab, setActiveTab] = useState("all-users");

  return (
    <>
      <div className="flex items-center justify-center mt-7">
        <div className="flex space-x-6 text-center text-green-500">
          {/* All User */}
          <a
            href="/all-users"
            onClick={() => setActiveTab("all-users")}
            className={`font-semibold pb-1 rounded-md px-3 ${
              activeTab === "all-users" ? "bg-green-500 text-white" : "hover:bg-green-100"
            }`}
          >
            All User
          </a>

          {/* Histories */}
          <a
            href="#"
            onClick={() => setActiveTab("histories")}
            className={`font-semibold pb-1 rounded-md px-3 ${
              activeTab === "histories" ? "bg-green-500 text-white" : "hover:bg-green-100"
            }`}
          >
            Histories
          </a>
        </div>
      </div>
    </>
  );
}
