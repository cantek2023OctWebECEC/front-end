import React from "react";

export const Header: React.FC = () => {
    return (
      <nav className="bg-300 p-4">
        <div className="container mx-auto">
          <div className="flex justify-between items-center">
            <div className="text-white text-xl font-bold">Travl Planning App</div>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="text-white hover:underline">Schedule</a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline">Member</a>
              </li>
              <li>
                <a href="#" className="text-white hover:underline ">Todo List</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  };
  

