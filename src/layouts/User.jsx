import { Outlet } from "react-router";
import Sidebar from "../pages/UserDashboard/Sidebar";
import DashboardOverview from "../components/DashboardOverview";

const User = () => {
  return (

    <div className="bg-gray-50">
          <div className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex ">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 p-6">
        <DashboardOverview/>
        <Outlet />
      </main>
      </div>
    </div>

 
  );
};

export default User;
