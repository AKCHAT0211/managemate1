import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
<<<<<<< HEAD
import { useTheme } from "../context/ThemeContext";

const AllUsers = () => {
  const { allUser, fetchAllUsers } = useAuth();
  const { darkMode } = useTheme();
=======

const AllUsers = () => {
  const { allUser, fetchAllUsers } = useAuth();
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

  useEffect(() => {
    fetchAllUsers();
  }, []);

<<<<<<< HEAD
=======
  // Categorize users by role
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
  const managers = allUser?.filter(user => user.role === "Manager") || [];
  const projectLeaders = allUser?.filter(user => user.role === "Project Leader") || [];
  const teamMembers = allUser?.filter(user => user.role === "Team Member") || [];

  return (
<<<<<<< HEAD
    <div className={`p-6 ml-64 min-h-screen transition-all ${darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
=======
    <div className="p-6 ml-64">
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      <h1 className="text-2xl font-bold mb-4">Users List</h1>

      {/* Managers */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Managers</h2>
<<<<<<< HEAD
        <ul className={`border p-4 rounded ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
=======
        <ul className="border p-4 rounded bg-gray-100">
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
          {managers.length > 0 ? managers.map(user => (
            <li key={user._id} className="py-1">{user.name} - {user.email}</li>
          )) : <p>No managers found.</p>}
        </ul>
      </div>

      {/* Project Leaders */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Project Leaders</h2>
<<<<<<< HEAD
        <ul className={`border p-4 rounded ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
=======
        <ul className="border p-4 rounded bg-gray-100">
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
          {projectLeaders.length > 0 ? projectLeaders.map(user => (
            <li key={user._id} className="py-1">{user.name} - {user.email}</li>
          )) : <p>No project leaders found.</p>}
        </ul>
      </div>

      {/* Team Members */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Team Members</h2>
<<<<<<< HEAD
        <ul className={`border p-4 rounded ${darkMode ? "bg-gray-800 border-gray-700" : "bg-gray-100 border-gray-300"}`}>
=======
        <ul className="border p-4 rounded bg-gray-100">
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
          {teamMembers.length > 0 ? teamMembers.map(user => (
            <li key={user._id} className="py-1">{user.name} - {user.email}</li>
          )) : <p>No team members found.</p>}
        </ul>
      </div>
    </div>
  );
};

export default AllUsers;
