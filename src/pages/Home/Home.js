import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Feature from "../../components/Feature/Feature";
import Footer from "../../components/Footer/Footer";
import { features } from "./data";
import "./Home.css";

const displayFeatures = () => {
  const featuresToDisplay = [...features];
  return featuresToDisplay.map((feature, index) => {
    return <Feature key={index} {...feature} />;
  });
};

// const scrollFeatures = (right = true) => {
//   const features = document.getElementById("features");
//   if (right) {
//     features.scrollLeft += 150;
//     return;
//   }
//   features.scrollLeft -= 150;
// };

const scrollTo = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
};

const navScroll = () => {
  const nav = document.getElementById("nav");
  if (!nav) {
    return;
  }
  if (window.pageYOffset > 0) {
    nav.classList.remove("absolute");
    nav.classList.add("opacity-80");
    nav.classList.add("pr-20");
    nav.classList.add("fixed");
    nav.classList.add("bg-white");
  } else {
    nav.classList.add("absolute");
    nav.classList.remove("pr-20");
    nav.classList.remove("fixed");
    nav.classList.remove("bg-white");
  }
};

const Home = () => {
  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) {
      return;
    }
    window.onscroll = navScroll;
  }, []);

  return (
    <div id="home" className="min-h-screen w-screen quicksand">
      <section id="index" className="relative hero pt-32 pb-20 lg:p-0 w-full grid grid-cols-12">
        <div className="col-span-12 bmd:col-span-10 lg:col-span-6 pl-24 pt-10 lg:pt-24 lg:mt-4 h-full flex flex-col justify-center w-5/6">
          <p className="text-4xl lg:text-5xl mb-4 capitalize">
            Your Everyday Financial History At Your Fingertips.
          </p>
          <p className="text-lg mb-8 leading-7 w-4/5">
            Keep effective track of your day to day spending. Record, analyze,
            generate and more.
          </p>
          <div className="w-fc">
            <Link to="/accounts/new">
              <Button type="filled">Begin</Button>
            </Link>
          </div>
        </div>
        <div className="hidden lg:block relative bg-light-grey col-span-6 pr-24">
          <img
            className="absolute left-0 w-full object-cover px-24"
            src="/images/home/hero.jpg"
            alt="hero"
            style={{ height: "90%", bottom: "-70px" }}
          />
        </div>

        <div
          id="nav"
          className="transition-all duration-300 ease-in z-10 absolute top-0 left-0 w-full py-8 px-24 flex items-center justify-between nunito"
        >
          <Link to="/" className="text-lg">
            Maui
          </Link>
          <div className="flex items-center">
            <Link
              to="/#index"
              onClick={() => {
                scrollTo("index");
              }}
              className="cursor-pointer mr-6"
            >
              Home
            </Link>
            <Link
              to="/#about"
              onClick={() => {
                scrollTo("about");
              }}
              className="cursor-pointer mr-6"
            >
              About
            </Link>
            <Link
              to="/#features"
              onClick={() => {
                scrollTo("features");
              }}
              className="cursor-pointer mr-6"
            >
              Features
            </Link>
            <Link to="/session/new" className="mr-6">
              <Button type="outlined">Login</Button>
            </Link>
            <Link to="/accounts/new">
              <Button type="filled">Signup</Button>
            </Link>
          </div>
        </div>
      </section>
      <section id="about" className="px-24">
        <div className="grid grid-cols-12 mb-20 lg:mb-12">
          <div className="col-span-12 bmd:col-span-6 flex mb-4 bmd:mb-0">
            <div className="about__img-primary-parent">
              <img
                src="/images/home/woman-portrait.jpg"
                className="object-cover w-full about__img-primary"
                alt="woman in portrait"
              />
            </div>
            <div className="flex flex-col about__img-secondary-parent">
              <img
                src="/images/home/man-smiling.jpg"
                className="object-cover w-full about__img-secondary"
                alt="girl holding icecream"
              />
              <img
                src="/images/home/man-looking.jpg"
                className="object-cover w-full about__img-secondary"
                alt="man staring"
              />
            </div>
          </div>
          <div className="col-span-12 bmd:col-start-8 bmd:col-end-13 flex flex-col justify-center">
            <p className="text-2xl font-semibold mb-4">
              Made for Everyday People
            </p>
            <p className="mb-5 text-justify">
              Maui was born out of a desire to help individuals easily and
              effectively track income and expenditure. We all know too well the
              feeling of receiving money one day and having it all exhausted the
              next without being able to reliably point to what it was all spent
              on. Maui is here to fix all that.
            </p>
            <p className="text-justify">
              With Maui, easily know what you spent on a particular day, or in a
              particular week or month as recorded by you. The intuitive tools
              and rich interface aim to be your guide as you go about tracking
              your income and expenditure.
            </p>
          </div>
        </div>
      </section>
      <section id="features" className="grid grid-cols-12 mt-10">
        <div className="hidden col-span-5 bmd:flex flex-col justify-center px-24">
          <p className="text-2xl mb-5 font-semibold">Made For Value</p>
          <p className="text-justify">
            Maui ships with a number of features designed to provide you with
            the best expense tracking experience possible. With a hyper focus on
            user satisfaction, Maui is also constantly striving to refine its
            processes to ensure a great user experience.
          </p>
        </div>
        <div className="col-span-12 bmd:col-span-7 mb-8 bmd:mb-0 px-24 py-20 bg-light-grey">
          <div id="features" className="features flex">
            {displayFeatures()}
          </div>
        </div>
        <div className="bmd:hidden col-span-12 flex flex-col justify-center px-24">
          <p className="text-2xl mb-5 font-semibold">Made For Value</p>
          <p className="text-justify">
            Maui ships with a number of features designed to provide you with
            the best expense tracking experience possible. With a hyper focus on
            user satisfaction, Maui is also constantly striving to refine its
            processes to ensure a great user experience.
          </p>
        </div>
      </section>
      <section className="bg-white p-24 grid grid-cols-12">
        <div className="col-span-12 bmd:col-start-2 bmd:col-end-12 grid grid-cols-12 items-center">
          <div
            className="relative col-span-12 bmd:col-span-5 bg-light-grey flex flex-col"
            style={{ height: "350px" }}
          >
            <div className="features__img-ease-parent relative grid grid-cols-12 col-gap-5 mb-5">
              <div className="col-span-6">
                <img
                  src="/images/home/calculator.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                  style={{ height: "175px" }}
                />
              </div>
              <div className="col-span-6">
                <img
                  src="/images/home/notes.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                  style={{ height: "175px" }}
                />
              </div>
            </div>
            <div className="features__img-ease-parent relative grid grid-cols-12 col-gap-5">
              <div className="col-span-6">
                <img
                  src="/images/home/calculator.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                  style={{ height: "175px" }}
                />
              </div>
              <div className="col-span-6">
                <img
                  src="/images/home/calculator.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                  style={{ height: "175px" }}
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 bmd:col-start-8 bmd:col-end-13 mt-16 bmd:mb-0 flex flex-col justify-center text-justify lg:pt-8 leading-7">
            <p className="text-2xl mb-4 font-semibold">Made For Ease</p>
            <p className="mb-5">
              Maui comes equiped with a convenience telegram bot through which
              users can add and view expenses without having to open up the app.
              MauiBot however is not enabled by default for Maui users. To
              enable MauiBot simply visit him and follow his prompts.
            </p>
            <div className="w-fc">
              <Button>
                <p>
                  MauiBot{" "}
                  <i className="ml-2 text-sm fa fa-external-link-alt"></i>
                </p>
              </Button>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
