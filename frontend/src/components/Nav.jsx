import React from "react";

const Nav = () => {
  return (
    <div className="bg-yellow-200 bg-opacity-70 w-full px-8 py-4 shadow">
      <div className="flex justify-between items-center w-full">
        <h1 className="font-bold text-6xl">YOUR DAY!</h1>
        <ul className="flex space-x-8">
          <li>
            <a
              href="/events"
              className="text-black font-semibold hover:underline"
            >
              Events
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Nav;
