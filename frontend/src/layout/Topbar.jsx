// Temporary mock – replace with real hook later
/*const useAuth = () => ({
  user: { email: "user@rxprescribe.com" },
});

export default function Topbar() {
  const { user } = useAuth();

  const username = user?.email ? user.email.split("@")[0] : "User";

  return (
    <header className="flex h-16 items-center justify-center border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <span className="text-sm text-gray-600">
          Welcome back,{" "}
          <strong className="text-emerald-700">{username}</strong>
        </span>
      </div>
    </header>
  );
}
*/

import React from "react";

/* -------- Fake Auth Hook -------- */
const useAuth = () => {
  const storedUser = localStorage.getItem("user");

  let user = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch (err) {
    user = null;
  }

  return { user };
};

/* -------- Topbar Component -------- */
export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-center border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        {/* Green gradient line */}
        <div className="h-8 w-1 bg-linear-to-b from-emerald-500 to-teal-500 rounded-full"></div>

        {/* Welcome text */}
        <span className="text-sm text-gray-600">
          Welcome back,{" "}
          <strong className="text-emerald-700">
            {user?.name || "User"}
          </strong>
        </span>
      </div>
    </header>
  );
}
