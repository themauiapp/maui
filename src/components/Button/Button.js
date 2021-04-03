import React from "react";
import "./Button.css";

const Button = ({ type, children }) => {
  return <button className={`btn btn-${type ?? "filled"}`}>{children}</button>;
};

export default Button;
