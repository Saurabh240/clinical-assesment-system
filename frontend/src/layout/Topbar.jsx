import React, { useEffect, useState } from "react";
import { authApi } from "../api/axios";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  return (
    <header className="h-16 flex items-center justify-center border-b bg-white shadow-sm">
      

      <div className="flex items-center gap-3">
        

        <div className="w-10 h-10 bg-linear-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-semibold text-sm">
            {user?.firstName?.charAt(0).toUpperCase() || "U"}
          </span>
        </div>

        <span className="text-lg text-gray-600">
          Welcome back,{" "}
          <strong className="text-emerald-600 font-semibold">
            {user?.firstName || "User"}
          </strong>
        </span>

      </div>

    </header>
  );
}
