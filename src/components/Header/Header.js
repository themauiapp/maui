import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { LOGOUT } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import { AppContext } from "../../contexts/AppContext";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { clearCookies } from "../../services/cookie";
import { notifySuccess } from "../../services/notify";
import errorHandler from "../../utilities/errorHandler";
import "./Header.css";

const Header = () => {
  const history = useHistory();
  const [options, setOptions] = useState(false);
  const { user } = useContext(AppContext);
  const { setLoading } = useContext(AuthHomeContext);
  const [logoutMutation] = useMutation(LOGOUT);

  const logout = async () => {
    setLoading(true);
    try {
      await logoutMutation();
      clearCookies();
      notifySuccess("logged out successfully");
      history.push("/session/new");
    } catch (error) {
      setLoading(false);
      errorHandler(error, history);
    }
  };

  return (
    <div className="w-full px-8 sm:px-16 bmd:px-24 py-8 flex justify-between items-center">
      <img
        src="/images/auth-home/search.png"
        alt="search"
        style={{ width: "28px", height: "28px" }}
      />
      <div
        onClick={() => {
          setOptions(!options);
        }}
        className="relative flex items-center"
      >
        <img
          src={user.avatar ?? "/images/auth-home/leke.JPG"}
          className="cursor-pointer object-cover mr-4 w-12 h-12 rounded-full"
          alt={user.name}
        />
        <div className="cursor-pointer mr-4 flex flex-col">
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
        <div
          onClick={(e) => {
            e.stopPropagation();
          }}
          className={`header__options absolute bottom-0 bg-white text-sm text-center shadow px-4 py-3 flex flex-col ${
            options ? "z-30 opacity-100" : "z--9999 opacity-0"
          }`}
        >
          <p className="w-fc cursor-pointer my-1">Change Avatar</p>
          <p
            onClick={() => {
              logout();
            }}
            className="w-fc cursor-pointer my-1"
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
