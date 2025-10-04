import React, { useEffect, useState } from "react";
import axios from "axios";

const Favorite = () => {
  const [likes, setLikes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getfav", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikes(response.data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };
    fetchFavorites();
  }, []);

  return (
    <div>
      <div className="border border-black rounded-xl bg-yellow-200 bg-opacity-70 text-black p-8 shadow-lg">
        <p className="font-bold text-4xl">Favourites:</p>
        <ul>
          {likes.length > 0 ? (
            likes.map((favv, index) => (
              <li key={index} className="flex space-x-4 items-start">
                <strong className="min-w-[100px] mt-5">{favv.name}:</strong>
                <ul className="flex space-x-4">
                  {favv.items.map((item, i) => (
                    <li
                      key={i}
                      className="bg-yellow-300 px-2 py-1 rounded my-5"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </li>
            ))
          ) : (
            <li>No favorites found</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Favorite;
