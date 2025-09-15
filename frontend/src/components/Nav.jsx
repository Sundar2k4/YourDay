import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-yellow-200 bg-opacity-70 w-full px-8 py-4 shadow">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-6xl">YOUR DAY!</h1>
        <ul className="flex space-x-8">
          <li>
            <div className="flex items-center space-x-4">
              <a
                href="/events"
                className="text-black font-semibold hover:underline"
              >
                Events
              </a>
              <button
                className="mt-2 w-full bg-black text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-xl p-2 font-bold transition"
                onClick={() => {navigate("/log")}}
              >
                Register
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
