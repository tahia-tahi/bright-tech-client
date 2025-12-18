import { User, FileText, PlusCircle, LayoutDashboard } from "lucide-react";
import { NavLink } from "react-router";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-lg text-sm transition
     ${isActive ? "bg-primary text-white" : "hover:bg-gray-100 text-gray-700"}`;

  return (
    <aside className="w-64 min-h-screen border-r bg-white p-4">
      <h2 className="text-lg text-primary font-semibold mb-6 flex items-center gap-2">
        <LayoutDashboard size={20} />
        Dashboard
      </h2>

      <nav className="space-y-2">
        <NavLink to="/user-dashboard/my-profile" className={linkClass}>
          <User size={18} />
          My Profile
        </NavLink>

        <NavLink to="/user-dashboard/my-posts" className={linkClass}>
          <FileText size={18} />
          My Posts
        </NavLink>

        <NavLink to="/user-dashboard/create-post" className={linkClass}>
          <PlusCircle size={18} />
          Create Post
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
