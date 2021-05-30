import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UPDATEAVATAR } from "../../graphql/user";
import { LOGOUT } from "../../graphql/auth";
import { useMutation } from "@apollo/client";
import { AuthHomeContext } from "../../contexts/AuthHomeContext";
import { clearCookies, setUserCookie } from "../../services/cookie";
import { notifySuccess } from "../../services/notify";
import { validateFile } from "../../utilities/file";
import Cookies from "universal-cookie";
import errorHandler from "../../utilities/errorHandler";
import "./Header.css";

const Header = () => {
  const history = useHistory();
  const [options, setOptions] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const { toggleSpinner } = useContext(AuthHomeContext);
  const [updateAvatarMutation] = useMutation(UPDATEAVATAR);
  const [logoutMutation] = useMutation(LOGOUT);
  const user = new Cookies().get("maui_user");

  const logout = async () => {
    toggleSpinner();
    try {
      await logoutMutation();
      clearCookies();
      notifySuccess("Logged out successfully");
      history.push("/session/new");
    } catch (error) {
      toggleSpinner();
      errorHandler(error, history);
    }
  };

  const selectFile = () => {
    const fileInput = document.getElementById("fileInput");
    fileInput.click();
  };

  const parseFile = (event) => {
    const file = event.target.files[0];
    if (validateFile(file)) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const avatar = document.getElementById("avatar");
        avatar.setAttribute("src", e.target.result);
        setAvatar(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const updateAvatar = async () => {
    toggleSpinner(true);
    const variables = { avatar };
    try {
      const response = await updateAvatarMutation({ variables });
      const data = response.data.updateAvatar;
      if (data.errorId) {
        const error = new Error(data.errorId);
        throw error;
      }
      setUserCookie(data);
      notifySuccess("Avatar updated successfully");
      setOptions(false);
      setAvatar(null);
    } catch (error) {
      errorHandler(error, history);
    } finally {
      toggleSpinner(false);
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
          id="avatar"
          src={
            user.avatar
              ? user.avatar.url
              : "/images/auth-home/DefaultAvatar.png"
          }
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
          <p
            onClick={(e) => {
              selectFile();
              e.stopPropagation();
            }}
            className="w-fc cursor-pointer my-1"
          >
            Change Picture
          </p>
          <input
            type="file"
            onChange={parseFile}
            id="fileInput"
            className="hidden"
          />
          {avatar && (
            <p
              onClick={() => {
                updateAvatar();
              }}
              className="w-fc cursor-pointer my-1"
            >
              Update
            </p>
          )}
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
