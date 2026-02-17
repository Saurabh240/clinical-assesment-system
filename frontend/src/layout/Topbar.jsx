

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
    <header className="flex h-16 items-center justify-center  bg-gradient-to-r from-emerald-50 to-teal-50 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-md">
          <span className="text-white font-semibold text-sm">
            {user ? user.firstName?.charAt(0).toUpperCase() : "U"}
          </span>
        </div>
        <span className="text-gray-700 text-lg">
          Welcome back, <strong className="text-emerald-600 font-semibold">{user ? user.firstName : "User"}</strong>
        </span>
      </div>
    </header>
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
