import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
<<<<<<< HEAD
import { Home, ClipboardList, PlusSquare, MessageSquare, LogOut, Menu, Moon, Sun, Users, Calendar } from "lucide-react";
=======
import {
  Home,
  ClipboardList,
  PlusSquare,
  MessageSquare,
  LogOut,
  Menu,
  Moon,
  Sun,
  Users,
  Calendar,
} from "lucide-react";
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";

const Sidebar = () => {
<<<<<<< HEAD
  const { user, logout, fetchAllUsers, allUser } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [meetingCount, setMeetingCount] = useState(0); 
=======
  const { user, logout, fetchAllUsers } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [meetingCount, setMeetingCount] = useState(0); // 🔹 Added state for meeting count
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

  useEffect(() => {
    if (user?.role === "Manager") {
      fetchAllUsers();
    }
  }, [user]);

<<<<<<< HEAD
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:5001/meetings"); 
=======
  // 🔹 Fetch Meetings Count
  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const response = await fetch("http://localhost:5001/meetings"); // Adjust API route if needed
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        const data = await response.json();
        setMeetingCount(data.length);
      } catch (error) {
        console.error("Error fetching meetings:", error);
      }
    };

    if (user?.role === "Manager" || user?.role === "Project Leader") {
      fetchMeetings();
    }
  }, [user]);

  const menuItems = [
<<<<<<< HEAD
    user?.role === "Manager" && { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    user?.role === "Project Leader" && { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    user?.role === "Team Member" && { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    user?.role === "Manager" && { path: "/projects", label: "Projects", icon: <ClipboardList size={20} /> },
    user?.role === "Manager" && { path: "/add-project", label: "Add Project", icon: <PlusSquare size={20} /> },
    user?.role === "Project Leader" && { path: "/projects", label: "Projects", icon: <ClipboardList size={20} /> },
    user?.role === "Project Leader" && { path: "/view-tasks", label: "Tasks List", icon: <ClipboardList size={20} /> },
    user?.role === "Team Member" && { path: "/my-tasks", label: "My Tasks", icon: <ClipboardList size={20} /> },

    user?.role === "Admin" && { path: "/admin/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    user?.role === "Admin" && { path: "/admin/projects", label: "Projects", icon: <ClipboardList size={20} /> },
    user?.role === "Admin" && { path: "/admin/users", label: "Users", icon: <Users size={20} /> },

    user?.role != "Admin" && { path: "/meetings", label: "Meetings", icon: <Calendar size={20} />, badge: meetingCount > 0 ? meetingCount : null },
    user?.role != "Admin" && { path: "/chat", label: "Chat", icon: <MessageSquare size={20} />, highlight: true },
  ].filter(Boolean);
  

  return (
    <div className={`h-screen ${darkMode ? "bg-gray-950 text-white" : "bg-gray-200 text-black"} fixed top-0 left-0 ${collapsed ? "w-20" : "w-64"} transition-all duration-300 p-4 flex flex-col shadow-lg`}>
      <button onClick={() => setCollapsed(!collapsed)} className="mb-6 focus:outline-none hover:scale-110 transition-transform">
=======
    { path: "/dashboard", label: "Dashboard", icon: <Home size={20} /> },
    user?.role === "Manager" && {
      path: "/projects",
      label: "Projects",
      icon: <ClipboardList size={20} />,
    },
    user?.role === "Manager" && {
      path: "/add-project",
      label: "Add Project",
      icon: <PlusSquare size={20} />,
    },
    user?.role === "Project Leader" && {
      path: "/projects",
      label: "Projects",
      icon: <ClipboardList size={20} />,
    },
    user?.role === "Project Leader" && {
      path: "/view-tasks",
      label: "Tasks List",
      icon: <ClipboardList size={20} />,
    },
    user?.role === "Team Member" && {
      path: "/my-tasks",
      label: "My Tasks",
      icon: <ClipboardList size={20} />,
    },
    {
      path: "/meetings",
      label: "Meetings",
      icon: <Calendar size={20} />,
      badge: meetingCount > 0 ? meetingCount : null, // ✅ Show meeting count
    },
    {
      path: "/chat",
      label: "Chat",
      icon: <MessageSquare size={20} />,
      highlight: true,
    },
  ].filter(Boolean);

  return (
    <div
      className={`h-screen ${
        darkMode ? "bg-gray-950 text-white" : "bg-gray-200 text-black"
      } fixed top-0 left-0 ${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 p-4 flex flex-col shadow-lg`}
    >
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="mb-6 focus:outline-none hover:scale-110 transition-transform"
      >
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        <Menu size={24} className={darkMode ? "text-white" : "text-black"} />
      </button>

      <nav className="flex flex-col space-y-4">
        {menuItems.map(({ path, label, icon, highlight, badge }) => (
<<<<<<< HEAD
          <Link key={path} to={path} className={`flex items-center space-x-3 p-2 rounded-lg transition-all hover:bg-blue-500 hover:scale-105 ${location.pathname === path ? "bg-blue-600" : ""} ${highlight ? "text-green-400 font-bold" : ""}`}>
=======
          <Link
            key={path}
            to={path}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-all hover:bg-blue-500 hover:scale-105 ${
              location.pathname === path ? "bg-blue-600" : ""
            } ${highlight ? "text-green-400 font-bold" : ""}`}
          >
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
            {icon}
            {!collapsed && <span>{label}</span>}
            {!collapsed && badge && <span className="badge">{badge}</span>}
          </Link>
        ))}

        {/* View Users Section (Only for Managers) */}
        {user?.role === "Manager" && (
          <div className="mt-6">
<<<<<<< HEAD
            <Link to="/all-users" className="flex items-center space-x-3 p-2 rounded-lg transition-all hover:bg-blue-500 hover:scale-105">
=======
            <Link
              to="/all-users"
              className="flex items-center space-x-3 p-2 rounded-lg transition-all hover:bg-blue-500 hover:scale-105"
            >
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
              <Users size={20} />
              {!collapsed && <span>All Users</span>}
            </Link>
          </div>
        )}
      </nav>

      {/* Dark Mode Toggle */}
<<<<<<< HEAD
      <button onClick={() => setDarkMode(!darkMode)} className="mt-6 flex items-center space-x-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all">
=======
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="mt-6 flex items-center space-x-3 p-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-all"
      >
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        {!collapsed && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
      </button>

<<<<<<< HEAD
      <button onClick={logout} className="mt-auto flex items-center space-x-3 p-2 bg-red-500 rounded-lg hover:bg-red-700 transition hover:scale-105">
=======
      <button
        onClick={logout}
        className="mt-auto flex items-center space-x-3 p-2 bg-red-500 rounded-lg hover:bg-red-700 transition hover:scale-105"
      >
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        <LogOut size={20} />
        {!collapsed && <span>Logout</span>}
      </button>
    </div>
  );
};

export default Sidebar;
