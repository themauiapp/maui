import React, { useState, useContext } from "react";
import { AppContext } from "../../contexts/AppContext";
import { Link } from "react-router-dom";

const AuthHomeSidebar = () => {
  const { user } = useContext(AppContext);
  const link = document.URL.split("/my/")[1];
  const [activeLink, setActiveLink] = useState(
    user.email_verified_at ? link : null
  );
  const links = [
    { name: "dashboard", icon: "clone" },
    { name: "expenses", icon: "credit-card" },
    { name: "income", icon: "coins" },
    { name: "analytics", icon: "chart-line" },
    { name: "profile", icon: "user-circle" },
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
          className={`relative transition-colors duration-500 ease-in pl-5 pr-4 py-3 rounded-full flex items-center mb-6 ${
            activeLink === link.name
              ? "bg-light-grey text-revolver-purple font-semibold"
              : ""
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
        </div>
      );
    });
  };

  return (
    <div
      className="bg-revolver-purple w-full h-full py-10 px-6 text-white flex flex-col"
      style={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "14.5px" }}
    >
      <div className="py-5 pl-5 mb-20 text-md text-white">
        <p>Maui</p>
      </div>
      {displayLinks()}
    </div>
  );
};

export default AuthHomeSidebar;
