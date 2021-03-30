import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import "./Home.css";

const Home = () => {
  return (
    <div className="min-h-screen w-screen quicksand">
      <section className="relative hero w-full grid grid-cols-12">
        <div className="col-span-6 pl-24 pt-24 mt-4 h-full flex flex-col justify-center w-5/6">
          <p className="text-5xl mb-4 capitalize">
            Your Everyday Financial History At Your Fingertips.
          </p>
          <p className="text-lg mb-8 leading-7 w-4/5">
            Keep effective track of your day to day spending. Record, analyze,
            generate and more.
          </p>
          <Link to="/accounts/new" className="nunito">
            <Button type='filled'>Get Started</Button>
          </Link>
        </div>
        <div
          className="relative col-span-6 pr-24"
          style={{ background: "#FBFBFB" }}
        >
          <img
            className="absolute left-0 w-full object-cover px-24"
            src="/images/home/hero.jpg"
            alt="hero"
            style={{ height: "90%", bottom: "-70px" }}
          />
        </div>

        <div className="absolute top-0 left-0 w-full pt-8 px-24 flex items-center justify-between nunito">
          <Link to="/" className="text-lg">
            Maui
          </Link>
          <div className="flex items-center">
            <p className="cursor-pointer mr-6">Home</p>
            <p className="cursor-pointer mr-6">About</p>
            <p className="cursor-pointer mr-6">Features</p>
            <Link to="/session/new" className="mr-6">
              <Button type='outlined'>Login</Button>
            </Link>
            <Link to="/accounts/new">
              <Button type='filled'>Signup</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
