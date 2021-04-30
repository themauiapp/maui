import React, { useContext } from "react";
import { AppContext } from "../../contexts/AppContext";

const Header = () => {
  const { user } = useContext(AppContext);
  return (
    <div className="w-full px-24 py-8 flex justify-between items-center">
      <img
        src="/images/auth-home/search.png"
        alt="search"
        style={{ width: "28px", height: "28px" }}
      />
      <div className="flex items-center">
        <img
          src={user.avatar ?? "/images/auth-home/leke.JPG"}
          className="object-cover mr-4 w-12 h-12 rounded-full"
          alt={user.name}
        />
        <div className="mr-4 flex flex-col">
          <p>
            {user.name.length > 25 ? user.name.slice(0, 22) + "..." : user.name}
          </p>
          <p className="text-gray-800" style={{ fontSize: "13px" }}>
            {user.email}
          </p>
        </div>
        <i
          style={{ top: "1px", transform: "rotate(90deg)" }}
          className="relative text-gray-600 fa fa-chevron-right"
        ></i>
      </div>
    </div>
  );
};

export default Header;