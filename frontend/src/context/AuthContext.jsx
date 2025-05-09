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
<<<<<<< HEAD
      // console.log("Token sent for fetching users:", token); // Debug log
      const response = await fetch("http://localhost:5001/auth/users", {
=======
      const response = await fetch(`${authAPI}/users`, {
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
<<<<<<< HEAD
        throw new Error(`Failed to fetch users: ${response.status} ${response.statusText}`);
=======
        throw new Error(
          `Failed to fetch users: ${response.status} ${response.statusText}`
        );
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
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
<<<<<<< HEAD
        throw new Error(`Failed to fetch all users: ${response.status} ${response.statusText}`);
=======
        throw new Error(
          `Failed to fetch all users: ${response.status} ${response.statusText}`
        );
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
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

<<<<<<< HEAD
      // console.log("Token stored:", data.token); // Debug log
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token); // Ensure token is stored
      setUser(userData);
      fetchUsers();

=======
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", data.token);
      setUser(userData);
      fetchUsers();

      navigate("/dashboard");

>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      return true;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    }
  };

<<<<<<< HEAD
  const register = async (name, email, password, role, profilePicture) => {
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("role", role);
      if (profilePicture) {
        formData.append("profilePicture", profilePicture);
      }
  
      const response = await fetch(`${authAPI}/register`, {
        method: "POST",
        credentials: "include",
        body: formData, 
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Registration failed");
      }
  
=======
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

>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    }
  };
<<<<<<< HEAD
  

  const logout = async () => {
    try {
      await fetch("http://localhost:5001/auth/logout", {
=======

  const logout = async () => {
    try {
      await fetch(`${authAPI}/logout`, {
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
<<<<<<< HEAD
      localStorage.removeItem("token"); // Remove token from localStorage
=======
      localStorage.removeItem("token");
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
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
<<<<<<< HEAD
      // console.log("Token sent for fetching profile:", token); // Debug log
=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      const response = await fetch(`${authAPI}/profile`, {
        method: "GET",
        credentials: "include",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) {
<<<<<<< HEAD
        throw new Error(`Failed to fetch profile: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setProfile(data);
=======
        throw new Error(
          `Failed to fetch profile: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();

      // Remove profile picture data from the profile object
      const { ...restProfileData } = data;
      setProfile(restProfileData);
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const updateProfile = async (updatedFields) => {
    try {
      const formData = new FormData();
<<<<<<< HEAD
      for (const key in updatedFields) {
        if (updatedFields[key]) {
          formData.append(key, updatedFields[key]);
        }
      }
  
      const response = await fetch(`${authAPI}/profile/edit`, {
        method: "PUT",
        credentials: "include",
        body: formData, // Don't set Content-Type here
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Failed to update profile");
      }
  
      if (data.user.name) {
        const updatedUser = { ...user, name: data.user.name };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setUser(updatedUser);
      }
  
      setProfile((prevProfile) => ({
        ...prevProfile,
        ...data.user,
      }));
  
=======
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

>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      return { success: true, message: "Profile updated successfully" };
    } catch (error) {
      console.error("Profile update error:", error);
      return { success: false, message: error.message };
    }
  };
<<<<<<< HEAD
  

  return (
    <AuthContext.Provider value={{
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
    }}>
=======

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
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      {children}
    </AuthContext.Provider>
  );
};

<<<<<<< HEAD
=======
// eslint-disable-next-line react-refresh/only-export-components
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
export const useAuth = () => useContext(AuthContext);
