function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Audit Logs</h2>
          <p className="text-gray-500 mt-2">
            View system activity logs
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">CSV Import</h2>
          <p className="text-gray-500 mt-2">
            Bulk upload ailment data
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Users</h2>
          <p className="text-gray-500 mt-2">
            Manage pharmacy users
          </p>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;