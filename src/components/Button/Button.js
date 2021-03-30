import React from "react";
import "./Button.css";

const Button = ({ type, children }) => {
  return (
    <button className={`btn btn-${type}`}>
      <div className="content">
          {children}
      </div>

      <div className="layer"></div>
    </button>
  );
};

export default Button;
