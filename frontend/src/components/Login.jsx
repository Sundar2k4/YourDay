import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api";
const Login = () => {
  const [Pass, setPass] = useState("");
  const [Email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post(
        "https://yourday-backend-0j79.onrender.com/log",
        {
          email: Email,
          password: Pass,
        }
      );

      localStorage.setItem("token", response.data.token);
      console.log("Token stored:", response.data.token);

      if (response.status === 200) {
        navigate("/");
      } else {
        alert("Error while logging in");
      }
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        alert(error.response.data.error || "Login failed");
      } else {
        alert("Network error. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">
      <form
        onSubmit={handlesubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80 flex flex-col"
      >
        <h1 className="text-3xl p-5 ">Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={Pass}
          onChange={(e) => setPass(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-black text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-xl p-3 font-bold transition disabled:opacity-50 hover:cursor-pointer"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
