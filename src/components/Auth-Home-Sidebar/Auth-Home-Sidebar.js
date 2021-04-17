import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Link } from "react-router-dom";

const AuthHomeSidebar = () => {
  const { user } = useContext(AppContext);
  const [activeLink, setActiveLink] = useState(
    user.email_verified_at ? "dashboard" : null
  );
  const links = [
    { name: "dashboard", icon: "clone" },
    { name: "expenses", icon: "credit-card" },
    { name: "analytics", icon: "chart-line" },
    { name: "profile", icon: "user-circle" },
    { name: "settings", icon: "wrench" },
  ];

  const switchLink = (link) => {
    if (!user.email_verified_at) {
      return;
    }
    setActiveLink(link);
  };

  const displayLinks = () => {
    return links.map((link, index) => {
      return (
        <div
          key={index}
          className={`relative transition-colors duration-300 ease-in flex items-center mb-10 ${
            activeLink === link.name ? "text-white" : ""
          }`}
        >
          <i className={`fas fa-${link.icon} mr-5`}></i>
          <Link
            onClick={() => {
              switchLink(link.name);
            }}
            to={`/my/${link.name}`}
            className="mr-auto"
          >
            {link.name.charAt(0).toUpperCase() + link.name.slice(1)}
          </Link>
          <div
            className={`transition-colors duration-300 ease-in absolute top-0 right-0 ${
              activeLink === link.name ? "bg-white" : null
            } h-full`}
            style={{ width: "3px" }}
          ></div>
        </div>
      );
    });
  };

  return (
    <div
      className="bg-revolver-purple w-full h-full py-10 pl-10 pr-1 flex flex-col"
      style={{ color: "rgba(255, 255, 255, 0.75)", fontSize: "14.5px" }}
    >
      <div className="py-5 mb-20 text-md text-white">
        <p>Maui</p>
      </div>
      {displayLinks()}
    </div>
  );
};

export default AuthHomeSidebar;
