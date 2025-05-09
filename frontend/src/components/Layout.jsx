<<<<<<< HEAD
import { Outlet, useLocation, useNavigate  } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
    const { profile, fetchProfile } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        fetchProfile();  // ✅ Ensure data is fetched when component mounts
    }, []);
  
    // Hide Sidebar on Login Page and Register
    if (location.pathname === "/" || location.pathname === "/register") {
      return <Outlet />; 
    }
  
    return (
      <div className="flex">
        <Sidebar />
        <div className="flex-grow p-4">

        <div className="absolute top-5 right-8 flex items-center space-x-4">
          <div className="cursor-pointer bg-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors text-white flex items-center space-x-2" onClick={() => navigate("/profile")} >
            <img 
              src={profile?.profilePicture ? `http://localhost:5001${profile.profilePicture}` : "/default-profile.png"} 
              alt="Profile" 
              className="w-8 h-8 rounded-full"
            />
=======
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";

const Layout = () => {
  const { profile, fetchProfile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile(); // ✅ Ensure data is fetched when component mounts
  }, []);

  // Hide Sidebar on Login Page and Register
  if (location.pathname === "/" || location.pathname === "/register") {
    return <Outlet />;
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow p-4">
        <div className="absolute top-5 right-8 flex items-center space-x-4">
          <div
            className="cursor-pointer bg-blue-500 px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition-colors text-white flex items-center space-x-2"
            onClick={() => navigate("/profile")}
          >
            {/* Profile picture removed */}
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
            <span className="font-semibold">{profile?.name}</span>
          </div>
        </div>

<<<<<<< HEAD

          <Outlet /> 
        </div>
      </div>
    );
  };
  
  export default Layout;
=======
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
