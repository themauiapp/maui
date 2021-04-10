import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Feature from "../../components/Feature/Feature";
import Footer from "../../components/Footer/Footer";
import HomeSidebar from "../../components/Home-Sidebar/Home-Sidebar";
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

const navScroll = () => {
  const nav = document.getElementById("nav");
  if (!nav) {
    return;
  }
  if (window.pageYOffset > 0) {
    nav.classList.remove("absolute");
    nav.classList.add("opacity-80");
    if (window.screen.width > 768) nav.classList.add("pr-20");
    nav.classList.add("fixed");
    nav.classList.add("bg-white");
  } else {
    nav.classList.add("absolute");
    if (window.screen.width > 768) nav.classList.remove("pr-20");
    nav.classList.remove("fixed");
    nav.classList.remove("bg-white");
  }
};

const Home = () => {
  const [sidebar, setSidebar] = useState(false);

  useEffect(() => {
    const home = document.getElementById("home");
    if (!home) {
      return;
    }
    window.onscroll = navScroll;
  }, []);

  const scrollTo = (id) => {
  const element = document.getElementById(id);
  element.scrollIntoView({ behavior: "smooth" });
  setSidebar(false);
};

  let overlayClasses =
    "fixed top-0 left-0 w-screen h-screen transition-all duration-300 ease-in opacity-100 z-10";
  overlayClasses = sidebar
    ? overlayClasses
    : overlayClasses.replace(/opacity-100 z-10/, "opacity-0 z--9999");

  return (
    <div id="home" className="min-h-screen w-screen quicksand">
      <section
        id="index"
        className="relative hero pt-20 bsm:pt-24 md:pt-32 pb-12 md:pb-16 lg:p-0 w-full grid grid-cols-12"
      >
        <div className="col-span-12 bmd:col-span-10 lg:col-span-6 px-8 sm:px-12 md:pl-24 lg:pt-24 mt-2 md:mt-0 lg:mt-4 h-full flex flex-col justify-center w-full md:w-5/6">
          <p className="text-3xl bsm:text-4xl lg:text-5xl mb-3 md:mb-4 capitalize">
            Your Everyday Financial History At Your Fingertips.
          </p>
          <p className="text-lg mb-5 md:mb-8 leading-7 w-4/5">
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
          className="transition-all duration-300 ease-in z-10 absolute top-0 left-0 w-full py-8 md:py-6 px-8 sm:px-12 md:px-24 flex items-center justify-between nunito"
        >
          <Link to="/" className="nav__home text-lg">
            Maui
          </Link>
          {window.screen.width <= 768 && (
            <div
              onClick={() => {
                setSidebar(!sidebar);
              }}
              className="nav__hamburger cursor-pointer"
            >
              <span></span>
            </div>
          )}
          {window.screen.width > 768 && (
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
          )}
          <div
            onClick={() => {
              setSidebar(!sidebar);
            }}
            className={overlayClasses}
            style={{ background: "rgba(0,0,0,0.2)" }}
          />
          <HomeSidebar active={sidebar} scrollTo={scrollTo} />
        </div>
      </section>
      <section id="about" className="px-8 sm:px-12 md:px-24">
        <div className="grid grid-cols-12 mb-12 md:mb-16 lg:mb-12">
          <div className="col-span-12 bmd:col-span-6 bsm:flex mb-8 bmd:mb-0">
            <div className="about__img-primary">
              <img
                src="/images/home/woman-portrait.jpg"
                className="object-cover w-full"
                alt="woman in portrait"
              />
            </div>
            <div className="hidden md:flex flex-col about__img-secondary">
              <img
                src="/images/home/man-smiling.jpg"
                className="object-cover w-full"
                alt="girl holding icecream"
              />
              <img
                src="/images/home/man-looking.jpg"
                className="object-cover w-full"
                alt="man staring"
              />
            </div>
          </div>
          <div className="col-span-12 bmd:col-start-8 bmd:col-end-13 flex flex-col justify-center">
            <p className="text-xl sm:text-2xl font-semibold mb-2 lg:mb-4 text-center md:text-left">
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
        <div className="col-span-12 bmd:col-span-7 mb-10 bmd:mb-0 px-8 sm:px-12 md:px-24 py-8 sm:py-12 md:py-20 bg-light-grey">
          <div id="features" className="features flex">
            {displayFeatures()}
          </div>
        </div>
        <div className="bmd:hidden col-span-12 flex flex-col justify-center px-8 sm:px-12 md:px-24">
          <p className="text-xl sm:text-2xl mb-3 lg:mb-5 font-semibold text-center md:text-left">
            Made For Value
          </p>
          <p className="text-justify">
            Maui ships with a number of features designed to provide you with
            the best expense tracking experience possible. With a hyper focus on
            user satisfaction, Maui is also constantly striving to refine its
            processes to ensure a great user experience.
          </p>
        </div>
      </section>
      <section className="bg-white px-8 sm:px-12 md:px-24 pt-12 sm:pt-16 md:pt-20 pb-12 sm:pb-16 bmd:p-24 grid grid-cols-12">
        <div className="col-span-12 lg:col-start-2 lg:col-end-12 grid grid-cols-12 items-center">
          <div className="relative col-span-12 bmd:col-span-6 lg:col-span-5 flex flex-col h-fc">
            <div className="features__img-ease relative grid grid-cols-12 col-gap-5 sm:mb-5">
              <div className="col-span-12 sm:col-span-6">
                <img
                  src="/images/home/calculator.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                />
              </div>
              <div className="hidden sm:block col-span-12 sm:col-span-6">
                <img
                  src="/images/home/calculator.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                />
              </div>
            </div>
            <div className="hidden features__img-ease relative sm:grid grid-cols-12 col-gap-5">
              <div className="col-span-6">
                <img
                  src="/images/home/calculator.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                />
              </div>
              <div className="col-span-6">
                <img
                  src="/images/home/calculator.jpg"
                  className="w-full object-cover"
                  alt="calculator"
                />
              </div>
            </div>
          </div>
          <div className="col-span-12 bmd:col-start-7 bmd:col-end-13 bmd:pl-12 mt-10 bmd:mt-0 flex flex-col items-center md:items-start justify-center text-justify leading-7">
            <p className="text-xl sm:text-2xl mb-3 bsm:mb-5 lg:mb-4 font-semibold text-center md:text-left">
              Made For Ease
            </p>
            <p className="mb-6 bmd:mb-5">
              Maui comes equiped with a convenience telegram bot through which
              users can add and view expenses without having to access the
              platform. As a Maui user however, MauiBot is not enabled by
              default. To enable MauiBot simply visit{" "}
              <a href="/" className="text-blue-800 mr-1">
                him
              </a>
              and follow his prompts. In no time, you will be enjoying the ease
              he provides.
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
