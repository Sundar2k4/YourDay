import axios from "axios";
import React, { useState, useEffect } from "react";

const Show = () => {
  const [Event, setEvent] = useState([]);

  useEffect(() => {
    const fetchevents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/getdata");
        setEvent(response.data);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchevents();
  }, []);

  const handleclick = async (id) => {
    try {
      const response = await axios.post("http://localhost:5000/delete", { id });
      if (response.status === 200) {
        setEvent(Event.filter((e) => e._id !== id));
        console.log("Deleted Successfully");
      }
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  return (
    <table className="min-w-full bg-white border border-gray-400 border-collapse my-9">
      <thead>
        <tr>
          <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-left">
            Name
          </th>
          <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-left">
            Event
          </th>
          <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-left">
            Date
          </th>
          <th className="border border-gray-400 px-4 py-2 bg-gray-100 text-left">
            Delete
          </th>
        </tr>
      </thead>
      <tbody>
        {Event.map((eve) => (
          <tr key={eve._id}>
            <td className="border border-gray-400 px-4 py-2">{eve.person}</td>
            <td className="border border-gray-400 px-4 py-2">{eve.event}</td>
            <td className="border border-gray-400 px-4 py-2">
              {new Date(eve.date).toLocaleDateString()}
            </td>
            <td
              className="hover:cursor-pointer"
              onClick={() => {
                handleclick(eve._id);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                />
              </svg>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default Show;
