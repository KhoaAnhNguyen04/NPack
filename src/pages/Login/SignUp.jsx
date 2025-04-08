import "react-loading-skeleton/dist/skeleton.css";
import "react-toastify/dist/ReactToastify.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import axios from "axios";

const apiUrl = process.env.REACT_APP_BACKEND_URL;

function SignUpPage(props) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(`${apiUrl}/register`, {
        username,
        password,
      });

      console.log("Register success:", response.data);
      toast.success("Account created successfully! Redirecting...");

      // Delay a little before redirecting
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      const errorMessage =
        err.response?.data?.message || "Registration failed.";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col-reverse md:flex-row global-px py-10 justify-center items-center min-h-[60vh]">
        <form
          onSubmit={handleSignUp}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Sign Up</h2>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input
              type="text"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
            disabled={loading}
          >
            {loading ? "Signing up..." : "Sign Up"}
          </button>
        </form>
      </main>
      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default SignUpPage;
