import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";

const Addfav = () => {
  const location = useLocation();
  const [Favs, setFavs] = useState("");
  const [Name, setName] = useState("");
  const itemsarray = Favs.split(",")
    .map((item) => item.trim())
    .filter((item) => item.length > 0);
  const navigate = useNavigate();
  useEffect(() => {
    if (location.state) {
      setName(location.state);
    }
  }, [location.state]);
  const handlesubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) return;
    const data = await fetch("http://localhost:5000/addfav", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: Name, items: itemsarray }),
    });
    if (data.ok) {
      navigate("/");
    } else {
      const errr = await data.json();
      alert("failed adding favourites", errr);
    }
  };

  return (
    <div className="bg-black min-h-screen">
      <Nav />
      <div className="ml-130">
        <form
          onSubmit={handlesubmit}
          className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 w-full max-w-md shadow-lg mt-50"
        >
          <div className="flex flex-col space-y-4">
            <p className="font-bold text-4xl">Enter the Favourites:</p>
            <label htmlFor="name" className="font-bold">
              Name:
            </label>
            <input
              type="text"
              onChange={(e) => {
                e.target.value;
              }}
              id="name"
              value={Name}
              className="rounded p-2 border border-gray-400 focus:outline-none focus:border-black"
            />
            <label htmlFor="favs" className="font-bold">
              Favourites:
            </label>
            <input
              type="text"
              id="favs"
              value={Favs}
              placeholder="Enter the person favourites as comma separated"
              onChange={(e) => setFavs(e.target.value)}
              className="rounded p-2 border border-gray-400 focus:outline-none focus:border-black"
            />
          </div>
          <button
            type="submit"
            className="mt-6 w-full bg-black text-yellow-200 hover:bg-yellow-300 hover:text-black rounded-xl p-2 font-bold transition hover:cursor-pointer"
          >
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addfav;
