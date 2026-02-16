import React, { useEffect, useState } from "react";
import { authApi } from "../api/axios";

export default function Topbar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    let called = false;

    const fetchUserData = async () => {
      if (called) return;
      called = true;

      try {
        const userData = await authApi.getCurrentUser();
        setUser(userData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchUserData();
  }, []);

  const displayName =
    user?.firstName || user?.email || "User";

  return (
   <header className="h-16 grid grid-cols-3 items-center border-b bg-white shadow-sm px-4">

  
  <div className="flex items-center gap-3">
    {/*<div className="h-8 w-1 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full items-center"></div>*/}
  </div>

  {/* Center */}
  <div className="text-center">
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
