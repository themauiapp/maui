import React from "react";
import "./Button.css";

const Button = ({ type, children, onClick }) => {
  return <button onClick={onClick} className={`btn btn-${type ?? "filled"} w-full`}>{children}</button>;
};

export default Button;
