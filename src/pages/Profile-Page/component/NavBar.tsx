import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export const ProfileNavBar = () => {
  const location = useLocation();
  const [activeLink, setActiveLink] = useState("profile");

  useEffect(() => {
    const path = location.pathname.split("/")[2];
    setActiveLink(path);
	console.log('Link',activeLink);
  }, [location.pathname]);

  return (
    <ul className="m-8 w-1/7">
      <div className="">
        <div className="text-white1">Travel Planning App</div>
      </div>
      <Link to="/profile/" className="cursor-pointer ">
        <li
          className={`m-auto p-auto p-2 text-white border-solid border-2 border-indigo-600 my-2 text-ellipsis overflow-hidden ${
            activeLink === "" ? "bg-200" : ""
          }`}
        >
          Account Details
        </li>
      </Link>
      <Link to="/profile/Trips">
        <li
          className={`p-2 text-white cursor-pointer border-solid border-2 border-indigo-600 my-2 text-ellipsis overflow-hidden ${
            activeLink === "Trips" ? "bg-200" : ""
          }`}
        >
          Trips
        </li>
      </Link>
      <Link to="/profile/Signout">
        <li
          className={`p-2 text-white cursor-pointer border-solid border-2 border-indigo-600 my-2 text-ellipsis overflow-hidden ${
            activeLink === "Signout" ? "bg-200" : ""
          }`}
        >
          Signout
        </li>
      </Link>
    </ul>
  );
};
