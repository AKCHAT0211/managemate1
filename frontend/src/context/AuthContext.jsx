import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const authAPI = "http://localhost:5001/auth";

  const [user, setUser] = useState(null);
  const [allUser, setAllUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      fetchProfile();
      fetchUsers();
    }
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${authAPI}/users`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch users: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const fetchAllUsers = async () => {
    try {
      const response = await fetch(`${authAPI}/allUsers`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch all users: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setAllUser(data);
    } catch (error) {
      console.error("Error fetching all users:", error);
    }
  };

  const login = async (email, password) => {
    try {
      const response = await fetch(`${authAPI}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      const userData = {
        id: data.user._id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        token: data.token,
      };

      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      setUser(userData);
      fetchUsers();

      navigate("/dashboard");

      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

  const register = async (name, email, password, role) => {
    try {
      const response = await fetch(`${authAPI}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }

      navigate("/");

      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };

  const logout = async () => {
    try {
      await fetch(`${authAPI}/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");
      setUser(null);
      setUsers([]);
      setProfile(null);

      setTimeout(() => {
        navigate("/");
      }, 100);
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${authAPI}/profile`, {
        method: "GET",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch profile: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Remove profile picture data from the profile object
      const { ...restProfileData } = data;
      setProfile(restProfileData);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async (updatedFields) => {
    try {
      const formData = new FormData();
      if (updatedFields.name) formData.append("name", updatedFields.name);
      if (updatedFields.password)
        formData.append("password", updatedFields.password);

      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("User is not authenticated. Please log in again.");
      }

      const response = await fetch(`${authAPI}/profile/edit`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }

      // Update local storage with the new profile details
      const updatedUser = {
        ...user,
        name: data.user.name || user.name,
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);

      setProfile((prevProfile) => ({
        ...prevProfile,
        name: data.user.name || prevProfile.name,
      }));

      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, message: error.message };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        allUser,
        profile,
        setProfile,
        users,
        register,
        login,
        logout,
        fetchProfile,
        updateProfile,
        fetchAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(AuthContext);
