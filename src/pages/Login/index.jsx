import "react-loading-skeleton/dist/skeleton.css";
import React, { useState } from "react";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import axios from "axios";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post("https://example.com/api/login", {
        email,
        password,
      });

      // Handle successful login (e.g., save token, redirect)
      console.log("Login success:", response.data);
      // props.history.push("/dashboard"); // if you're using react-router

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      <main className="flex flex-col-reverse md:flex-row global-px py-10 justify-center items-center min-h-[60vh]">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white shadow-md rounded-lg p-8 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Login</h2>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded px-3 py-2"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </main>
      <Footer />
    </>
  );
}

export default LoginPage;
