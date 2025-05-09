import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/clogo.png";
<<<<<<< HEAD
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Manager",
  });

<<<<<<< HEAD
  const [selectedImage, setSelectedImage] = useState(null);
  const [profilePicture, setProfilePicture] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
=======
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const { name, email, password } = formData;
<<<<<<< HEAD

    if (!name.trim()) return "Full Name is required.";

    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nameRegex.test(name))
      return "Full Name can only contain letters and spaces.";
    if (name.length < 3 || name.length > 25)
      return "Full Name must be between 3 and 25 characters.";

    if (!email.trim()) return "Email is required.";

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!emailRegex.test(email)) return "Please enter a valid email.";
    if (email.length < 8 || email.length > 35)
      return "Email must be between 8 and 35 characters.";

    if (!password) return "Password is required.";

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,15}$/;
    if (!passwordRegex.test(password))
      return "Password must be 8-15 characters long, with at least one number and one special character.";
=======
    if (!name.trim()) return "Full Name is required.";
    if (name.length > 15) return "Full Name cannot exceed 15 characters.";

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|protonmail\.com|hotmail\.com)$/;
    if (!email.trim()) return "Email is required.";
    if (!emailRegex.test(email))
      return "Please enter a valid email (Gmail, Yahoo, Outlook, etc.).";

    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
    if (!password) return "Password is required.";
    if (!passwordRegex.test(password))
      return "Password must be 6-15 characters long, with at least one number and one special character.";
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
=======
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      return;
    }

    const success = await register(
      formData.name,
      formData.email,
      formData.password,
<<<<<<< HEAD
      formData.role,
      profilePicture
    );

    if (!success) {
      toast.error("Registration failed! Please try again.");
    } else {
      toast.success("Registration Successful! Redirecting...");
      setTimeout(() => {
        navigate("/");
=======
      formData.role
    );
    if (!success) {
      setError("Registration failed! Try again.");
    } else {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/"); // Redirect after successful registration
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      }, 3000);
    }
  };

  const handleClear = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "Manager",
    });
<<<<<<< HEAD
    setSelectedImage(null);
    setProfilePicture(null);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
      setProfilePicture(file);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-200">
      <div className="bg-blue-300 bg-opacity-50 p-10 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-700 flex flex-col md:flex-row">
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img src={logo} alt="Logo" className="w-3/4" />
        </div>

=======
    setError("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-blue-300 bg-opacity-50 p-10 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-700 flex">
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img src={logo} alt="Logo" className="w-3/4" />
        </div>
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 text-center mb-6">
            Create Account
          </h1>

<<<<<<< HEAD
=======
          {error && (
            <p className="text-red-500 text-sm text-center bg-red-900 p-2 rounded-lg">
              {error}
            </p>
          )}
          {showPopup && (
            <div className="fixed top-10 right-10 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
              Registration Successful!..
            </div>
          )}

>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
<<<<<<< HEAD
              minLength="5"
              maxLength="25"
=======
              maxLength="15"
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
              className="mb-4 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="email"
              name="email"
<<<<<<< HEAD
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              minLength="8"
              maxLength="35"
              className="mb-4 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                minLength="8"
                maxLength="15"
                className="w-full p-3 pr-10 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute top-1/2 right-3 transform -translate-y-1/2 text-white"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5" />
                ) : (
                  <EyeIcon className="h-5 w-5" />
                )}
              </button>
            </div>

=======
              placeholder="Email (Only Gmail, Yahoo, Outlook)"
              value={formData.email}
              onChange={handleChange}
              className="mb-4 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (6-15 characters)"
              value={formData.password}
              onChange={handleChange}
              maxLength="15"
              className="mb-4 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            />
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className="mb-4 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400"
            >
              <option value="Manager">Manager</option>
              <option value="Project Leader">Project Leader</option>
              <option value="Team Member">Team Member</option>
            </select>

<<<<<<< HEAD
            {/* Profile Image Upload Section */}
            <div className="flex flex-col items-center mb-6">
              <label className="cursor-pointer flex flex-col items-center justify-center w-full p-4 rounded-xl bg-gray-700 text-white hover:bg-gray-600">
                {selectedImage ? (
                  <img
                    src={selectedImage}
                    alt="Profile Preview"
                    className="w-16 h-16 rounded-full object-cover mb-2"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <span>Upload Profile Image</span>
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Buttons */}
=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
            <div className="flex justify-between gap-4">
              <button
                type="submit"
                className="w-1/2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold"
              >
                Register
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="w-1/2 bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white py-3 rounded-xl font-semibold"
              >
                Clear
              </button>
            </div>
          </form>

          <p className="text-gray-900 text-center mt-4">
            Already have an account?{" "}
            <Link to="/" className="text-blue-800 hover:text-blue-500">
              Login
            </Link>
          </p>
        </div>
      </div>
<<<<<<< HEAD

      <ToastContainer position="top-center" autoClose={3000} />
=======
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
    </div>
  );
};

export default Register;
