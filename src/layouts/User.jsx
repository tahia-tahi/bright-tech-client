import { Outlet } from "react-router";
import Sidebar from "../pages/UserDashboard/Sidebar";

const User = () => {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default User;
