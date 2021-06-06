import React from "react";

const Overlay = ({ active, setActive, width }) => {
  let classes =
    "fixed top-0 left-0 w-screen h-screen transition-all duration-300 ease-in opacity-100 z-20";
  classes = active
    ? classes
    : classes.replace(/opacity-100 z-20/, "opacity-0 z--9999");

  return (
    <div
      onClick={() => {
        if (window.screen.width <= width ?? 768) {
          setActive(!active);
        }
      }}
      className={classes}
      style={{ background: "rgba(0,0,0,0.2)" }}
    />
  );
};

export default Overlay;
