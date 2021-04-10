import React from "react";
import "./Button.css";

const Button = ({ type, children, onClick }) => {
  return (
    <button onClick={onClick} className={`btn btn-${type ?? "filled"} w-full`}>
      <div className="content">{children}</div>

      <div className="layer"></div>
    </button>
  );
};

export default Button;
