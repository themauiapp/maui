import React from "react";
import "./Loader.css";

const Loader = ({ display }) => {
  let classes =
    "transition-all duration-300 ease-in absolute top-0 left-0 w-full h-full bg-revolver-purple flex justify-center items-center z-30 opacity-100";
  classes = display
    ? classes
    : classes.replace(/z-30 opacity-100/, "z--9999 opacity-0");

  return (
    <div className={classes}>
      <div className="loader" />
    </div>
  );
};

export default Loader;
