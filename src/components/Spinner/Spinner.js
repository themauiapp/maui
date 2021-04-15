import React from "react";
import "./Spinner.css";

const Spinner = ({ display }) => {
  let classes =
    "transition-colors ease-in duration-300 fixed bottom-0 right-0 mb-8 mr-10 z--9999 opacity-0";

  if (display) {
    classes = classes.replace(/z--9999 opacity-0/, "z-10 opacity-100");
  }

  return (
    <div className={classes}>
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
