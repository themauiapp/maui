import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./HomeSidebar.css";

const HomeSidebar = ({ active, scrollTo }) => {
  const [display, setDisplay] = useState(active);
  const [activeTab, setActiveTab] = useState("index");

  useEffect(() => {
    setDisplay(active);
  }, [active]);

  let classes =
    "home__sidebar active z-20 transition-all duration-300 ease-in bg-white";
  classes = display ? classes : classes.replace(/active z-20/, "z--9999");

  let linkClasses =
    "cursor-pointer mb-8 w-fc text-revolver-purple font-semibold";
  linkClasses =
    window.screen.width > 390
      ? linkClasses
      : linkClasses.replace(/mb-8/, "mb-6");

  return (
    <div className={classes}>
      <div className="nunito flex flex-col justify-center px-12 bsm:px-16 h-1/2 ">
        <Link
          to="/#index"
          onClick={() => {
            scrollTo("index");
            setActiveTab("index");
          }}
          className={
            activeTab === "index"
              ? linkClasses
              : linkClasses.replace(/text-revolver-purple font-semibold/, "")
          }
        >
          Home
        </Link>
        <Link
          to="/#about"
          onClick={() => {
            scrollTo("about");
            setActiveTab("about");
          }}
          className={
            activeTab === "about"
              ? linkClasses
              : linkClasses.replace(/text-revolver-purple font-semibold/, "")
          }
        >
          About
        </Link>
        <Link
          to="/#features"
          onClick={() => {
            scrollTo("features");
            setActiveTab("features");
          }}
          className={
            activeTab === "features"
              ? linkClasses
              : linkClasses.replace(/text-revolver-purple font-semibold/, "")
          }
        >
          Features
        </Link>
        <Link to="/session/new" className="mb-6 bsx:mb-8">
          Signup
        </Link>
        <Link to="/accounts/new">Login</Link>
      </div>
      <div className="quicksand bg-revolver-purple px-12 bsm:px-16 flex items-center h-1/2 text-white">
        <div className="flex flex-col">
          <p className="leading-7">
            Empowering you to take control over your financial future by
            presenting you with trends and patterns of your spending habits.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HomeSidebar;
