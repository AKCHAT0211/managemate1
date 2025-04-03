import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import logo from "../assets/clogo.png"; // Ensure the correct path

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    return passwordRegex.test(password);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");

    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    if (!trimmedEmail) {
      setEmailError("Email is required.");
      return;
    } else if (!validateEmail(trimmedEmail)) {
      setEmailError("Email must be from Gmail, Yahoo, Outlook, etc.");
      return;
    }

    if (!trimmedPassword) {
      setPasswordError("Password is required.");
      return;
    } else if (!validatePassword(trimmedPassword)) {
      setPasswordError(
        "Password must be 6-15 characters long, with at least one number and one special character."
      );
      return;
    }

    const success = await login(trimmedEmail, trimmedPassword);
    if (!success) {
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
        <div className="hidden md:flex md:w-1/2 justify-center items-center">
          <img src={logo} alt="Logo" className="w-3/4" />
        </div>

        {/* Right Section - Login Form */}
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

            <div className="flex gap-4 mt-4">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl font-semibold tracking-wide transition duration-300 shadow-lg w-full"
              >
                Login
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="bg-gradient-to-r from-gray-500 to-gray-700 hover:from-gray-600 hover:to-gray-800 text-white py-3 rounded-xl font-semibold tracking-wide transition duration-300 shadow-lg w-full"
              >
                Clear
              </button>
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
    </div>
  );
};

export default Login;
