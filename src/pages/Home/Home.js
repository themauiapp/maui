import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Feature from "../../components/Feature/Feature";
import Footer from "../../components/Footer/Footer";
import HomeSidebar from "../../components/HomeSidebar/HomeSidebar";
import Overlay from "../../components/Overlay/Overlay";
import { features } from "./data";
import "./Home.css";

const displayFeatures = () => {
  const featuresToDisplay = [...features];
  return featuresToDisplay.map((feature, index) => {
    return <Feature key={index} {...feature} />;
  });
};

const scrollFeatures = (right = true) => {
  const features = document.getElementById("app_features");
  if (right) {
    features.scrollLeft += 300;
    return;
  }
  features.scrollLeft -= 300;
};

const navScroll = () => {
  const nav = document.getElementById("nav");
  if (!nav) {
    return;
  }
  if (window.pageYOffset > 0) {
    nav.classList.remove("absolute");
    nav.classList.add("opacity-80");
    nav.classList.add("fixed");
    nav.classList.add("bg-white");
  } else {
    nav.classList.add("absolute");
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

    if (window.screen.width <= 768) {
      window.onscroll = navScroll;
    }
  }, []);

  const scrollTo = (id) => {
    const element = document.getElementById(id);
    element.scrollIntoView({ behavior: "smooth" });
    setSidebar(false);
  };

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
            src="https://res.cloudinary.com/olamileke/image/upload/v1672230240/maui/assets/home-page/compressed-maui-hero_qwinlr.jpg"
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
        </div>
      </section>
      <section id="about" className="px-8 sm:px-12 md:px-24">
        <div className="grid grid-cols-12 mb-12 md:mb-16 lg:mb-12">
          <div className="col-span-12 bmd:col-span-6 bsm:flex mb-8 bmd:mb-0">
            <div className="about__img-primary">
              <img
                src="https://res.cloudinary.com/olamileke/image/upload/v1672230314/maui/assets/home-page/compressed-woman-portrait_idoom0.jpg"
                className="object-cover w-full"
                alt="woman in portrait"
              />
            </div>
            <div className="hidden md:flex flex-col about__img-secondary">
              <img
                src="https://res.cloudinary.com/olamileke/image/upload/v1672230390/maui/assets/home-page/compressed-man-smiling_mzngnn.jpg"
                className="object-cover w-full"
                alt="girl holding icecream"
              />
              <img
                src="https://res.cloudinary.com/olamileke/image/upload/v1672230462/maui/assets/home-page/compressed-man-looking_v2gvnc_lhl4q2.jpg"
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
        <div className="col-span-12 bmd:col-span-7 mb-10 bmd:mb-0 px-8 sm:px-12 md:px-24 sm:py-12 md:py-20 sm:bg-light-grey">
          <div id="app_features" className="features flex mb-4">
            {displayFeatures()}
          </div>
          <div className="flex justify-between">
            <i
              onClick={() => {
                scrollFeatures(false);
              }}
              className="fa fa-long-arrow-alt-left text-lg cursor-pointer"
            ></i>
            <i
              onClick={() => {
                scrollFeatures();
              }}
              className="fa fa-long-arrow-alt-right text-lg cursor-pointer"
            ></i>
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
          <div className="hiddenrelative col-span-12 bmd:col-span-6 lg:col-span-5 flex flex-col h-fc">
            <div className="features__img-ease relative grid grid-cols-12 col-gap-5 sm:mb-5">
              <div className="col-span-12 sm:col-span-6">
                <img
                  src="https://res.cloudinary.com/olamileke/image/upload/v1672230644/maui/assets/home-page/compressed-man-headphones_j8dxhf.jpg"
                  className="w-full object-cover"
                  alt="man wearing headphones"
                />
              </div>
              <div className="hidden sm:block col-span-12 sm:col-span-6">
                <img
                  src="https://res.cloudinary.com/olamileke/image/upload/v1672230703/maui/assets/home-page/compressed-girl-walking_gir5vc.jpg"
                  className="w-full object-cover"
                  alt="girl walking"
                />
              </div>
            </div>
            <div className="hidden features__img-ease relative sm:grid grid-cols-12 col-gap-5">
              <div className="col-span-6">
                <img
                  src="https://res.cloudinary.com/olamileke/image/upload/v1672230752/maui/assets/home-page/compressed-rasta-smiling_xshjiy.jpg"
                  className="w-full object-cover"
                  alt="black man smiling"
                />
              </div>
              <div className="col-span-6">
                <img
                  src="https://res.cloudinary.com/olamileke/image/upload/v1672230809/maui/assets/home-page/compressed-people-on-road_lkkpo4.jpg"
                  className="w-full object-cover"
                  alt="crowd walking on sidewalk"
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
              <a
                href="https://t.me/themauibot"
                target="_blank"
                rel="noopener noreferrer"
                className="text-revolver-purple mr-1"
                style={{
                  borderBottom: "1px solid black",
                  paddingBottom: 0,
                }}
              >
                him
              </a>
              and follow his prompts. In no time, you will be enjoying the ease
              he provides.
            </p>
            <div className="w-fc">
              <a
                href="https://t.me/themauibot"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button botBtn>
                  <p>
                    MauiBot{" "}
                    <i className="ml-2 text-sm fa fa-external-link-alt"></i>
                  </p>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
      <HomeSidebar active={sidebar} scrollTo={scrollTo} />
      <Overlay active={sidebar} setActive={setSidebar} width={768} />
    </div>
  );
};

export default Home;
