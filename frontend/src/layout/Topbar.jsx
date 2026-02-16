

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


  return (
<<<<<<< HEAD
   <header className="flex h-16 items-center justify-center border-b bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full"></div>

        <span className="text-gray-600 text-lg">
  Welcome back,{" "}
  <strong className="text-emerald-600 font-semibold">
    {user ? `${user.firstName} ` : "User"}
  </strong>
</span>

=======
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm lg:px-6">
      {/* Left side - spacing for mobile menu button */}
      <div className="flex items-center gap-3 ml-14 lg:ml-0">
        <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <span className="text-sm text-gray-600 hidden sm:block">
          Welcome back, <strong className="text-emerald-700">{user?.email}</strong>
        </span>
        <span className="text-sm text-gray-600 sm:hidden">
          Welcome back, <strong className="text-emerald-700">{user?.email}</strong>
        </span>
>>>>>>> origin/feature/awadhesh
      </div>
    </header>
  );
}
