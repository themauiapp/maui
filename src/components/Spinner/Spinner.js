import React from "react";
import "./Spinner.css";

const Spinner = ({ display, fixed = true, alt = false }) => {
  let classes =
    "transition-colors ease-in duration-300 fixed mb-8 mr-10 bottom-0 right-0  z--9999 opacity-0";
  classes = !fixed ? classes.replace(/fixed mb-8 mr-10/, "") : classes;
  classes = display
    ? classes.replace(/z--9999 opacity-0/, "z-10 opacity-100")
    : classes;

  return (
    <div className={classes}>
      <div
        className={`spinner ${alt ? "border-white" : "border-revolver-purple"}`}
        style={{ width: alt ? "20px" : "30px", height: alt ? "20px" : "30px" }}
      ></div>
    </div>
  );
};

export default Spinner;
