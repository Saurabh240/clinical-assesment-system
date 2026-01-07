// Temporary mock – replace with real hook later
const useAuth = () => ({
  user: { email: "user@rxprescribe.com" },
});

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-6 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-8 w-1 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></div>
        <span className="text-sm text-gray-600">
          Welcome back, <strong className="text-emerald-700">{user?.email}</strong>
        </span>
      </div>
      
      
    </header>
  );
}