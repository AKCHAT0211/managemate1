import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
<<<<<<< HEAD
import logo from "../assets/clogo.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
=======
import logo from "../assets/clogo.png"; // Ensure the correct path
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
<<<<<<< HEAD
  const [showPassword, setShowPassword] = useState(false);

  // Email Validation
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email) && email.length >= 8 && email.length <= 35;
  };

  // Password Validation
  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&])[a-zA-Z0-9!@#$%^&]{8,15}$/;
=======
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|protonmail\.com|hotmail\.com)$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,15}$/;
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
<<<<<<< HEAD
=======
    setEmailError("");
    setPasswordError("");
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
<<<<<<< HEAD
      toast.error("Email is required.");
      return;
    } else if (!validateEmail(trimmedEmail)) {
      toast.error("Invalid email. Please enter a valid email address.");
=======
      setEmailError("Email is required.");
      return;
    } else if (!validateEmail(trimmedEmail)) {
      setEmailError("Email must be from Gmail, Yahoo, Outlook, etc.");
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      return;
    }

    if (!trimmedPassword) {
<<<<<<< HEAD
      toast.error("Password is required.");
      return;
    } else if (!validatePassword(trimmedPassword)) {
      toast.error(
        "Password must be 8-15 characters long, include a number and special character."
=======
      setPasswordError("Password is required.");
      return;
    } else if (!validatePassword(trimmedPassword)) {
      setPasswordError(
        "Password must be 6-15 characters long, with at least one number and one special character."
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
      );
      return;
    }

    const success = await login(trimmedEmail, trimmedPassword);
    if (!success) {
<<<<<<< HEAD
      toast.error("Incorrect email or password. Please try again.");
    } else {
      toast.success("Login Successful! Redirecting...");
      const user = JSON.parse(localStorage.getItem("user"));
      if (user.role === "Admin") {
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-blue-300 bg-opacity-50 p-10 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-700 transform hover:scale-105 transition duration-500 flex">
=======
      setPasswordError("Incorrect email or password. Please try again.");
    } else {
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
        navigate("/dashboard");
      }, 100000); //  seconds
    }
  };

  const handleClear = () => {
    setEmail("");
    setPassword("");
    setEmailError("");
    setPasswordError("");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-200">
      <div className="bg-blue-300 bg-opacity-50 p-10 rounded-3xl shadow-2xl w-full max-w-4xl border border-gray-700 transform hover:scale-105 transition duration-500 flex">
        {/* Left Section - Logo */}
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img src={logo} alt="Logo" className="w-3/4" />
        </div>

<<<<<<< HEAD
=======
        {/* Right Section - Login Form */}
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
        <div className="w-full md:w-1/2 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 text-center mb-6">
            MANAGEMATE
          </h1>
          <h2 className="text-gray-800 text-3xl font-extrabold mb-6 text-center">
            Welcome Back
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col w-full">
            <input
              type="email"
<<<<<<< HEAD
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              minLength={8}
              maxLength={35}
              className="mb-2 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-900 w-full"
            />

            <div className="relative mb-4">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                minLength={8}
                maxLength={15}
                className="w-full p-3 pr-10 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 focus:ring-blue-400 focus:bg-gray-900"
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
              placeholder="Email (Gmail, Yahoo, Outlook, etc.)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mb-2 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 ${
                emailError ? "focus:ring-red-500" : "focus:ring-blue-400"
              } focus:bg-gray-900 w-full`}
            />
            {emailError && <p className="text-red-500 text-sm">{emailError}</p>}

            <input
              type="password"
              placeholder="Password (6-15 characters)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mb-2 p-3 rounded-xl bg-gray-700 text-white outline-none focus:ring-2 ${
                passwordError ? "focus:ring-red-500" : "focus:ring-blue-400"
              } focus:bg-gray-900 w-full`}
            />
            {passwordError && (
              <p className="text-red-500 text-sm">{passwordError}</p>
            )}
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold tracking-wide transition duration-300 shadow-lg w-full"
              >
                Login
              </button>
<<<<<<< HEAD
=======
              <button
                type="button"
                onClick={handleClear}
                className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white py-3 rounded-xl font-semibold tracking-wide transition duration-300 shadow-lg w-full"
              >
                Clear
              </button>
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
            </div>
          </form>

          <p className="text-gray-900 text-center mt-4">
            Don't have an account?
            <Link to="/register" className="text-blue-800 hover:text-blue-500">
              {" "}
              Sign up
            </Link>
          </p>
        </div>
      </div>

<<<<<<< HEAD
      <ToastContainer position="top-center" autoClose={3000} />
=======
      {/* Success Popup - Custom Modal */}
      {showPopup && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-center w-96">
            <h3 className="text-green-600 text-xl font-bold">
              Login Successful!
            </h3>
            <p className="text-gray-700 mt-2">
              Redirecting to dashboard in 10 seconds...
            </p>
          </div>
        </div>
      )}
>>>>>>> 5dba43d42e866c91433cd7e2e7db5eeaa2f38bee
    </div>
  );
};

export default Login;
