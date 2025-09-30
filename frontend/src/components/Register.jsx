import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [Pass, setPass] = useState("");
  const [Email, setEmail] = useState("");
  const navigate = useNavigate();

  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/reg", {
        email: Email,
        password: Pass,
      });
      if (response.status === 201) {
        alert("Registered Successfully");
        navigate("/logg");
      } else {
        alert("Error during registration");
      }
    } catch (error) {
      alert("Registration failed");
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black">
      <form
        onSubmit={handlesubmit}
        className="bg-white p-8 rounded-xl shadow-md w-80 flex flex-col"
      >
        <h1 className="text-3xl p-5">Register</h1>
        <input
          type="text"
          placeholder="Email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-4 p-2 border border-gray-300 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={Pass}
          onChange={(e) => setPass(e.target.value)}
          className="mb-6 p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-black text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-xl p-3 font-bold transition"
        >
          Register
        </button>
        <p className="mt-5">
          Already Registered?{" "}
          <a href="/logg" className="text-sky-800">
            Login Here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
