import React from "react";
import { Link } from "react-router-dom";
import Button from "../../components/Button/Button";
import Feature from "../../components/Feature/Feature";
import "./Home.css";

const features = [
  {
    name: "Record your month to month income",
    description:
      "Easily record your day to day expenses via the app or Telegram Bot",
    image_url: "/images/home/wallet.jpg",
  },
  {
    name: "Record day to day expenses",
    description:
      "Easily record your day to day expenses via the app or Telegram Bot",
    image_url: "/images/home/man-holding-dollar.jpg",
  },
  {
    name: "Access Analytics",
    description:
      "Generate graphs and charts detailing your spending for various periods.",
    image_url: "/images/home/paper-graph.jpg",
  },
  {
    name: "Download Financial Information",
    description:
      "Download income and expense information for use in excel file format.",
    image_url: "/images/home/man-holding-dollar.jpg",
  },
];

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
          <Link to="/accounts/new">
            <Button type="filled">Begin</Button>
          </Link>
        </div>
        <div className="relative bg-light-grey col-span-6 pr-24">
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
              <Button type="outlined">Login</Button>
            </Link>
            <Link to="/accounts/new">
              <Button type="filled">Signup</Button>
            </Link>
          </div>
        </div>
      </section>
      <section className="px-24">
        <div className="grid grid-cols-12 mb-12">
          <div className="col-span-6 flex">
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
          <div className="col-start-8 col-end-13 flex flex-col justify-center">
            <p className="text-2xl font-semibold mb-4">
              Made for The Everyday Person
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
      <section className="grid grid-cols-12 mt-10">
        <div className="col-span-5 flex flex-col justify-center px-24">
          <p className="text-2xl mb-5 font-semibold">Made For Value</p>
          <p className="text-justify">
            Maui ships with a number of features designed to provide you with
            the best expense tracking experience possible. With a hyper focus on
            user satisfaction, Maui is also constantly striving to refine its
            processes to ensure a great user experience.
          </p>
        </div>
        <div className="col-span-7 px-24 py-20 bg-light-grey">
          <div id="features" className="features flex">
            {displayFeatures()}
          </div>
          {/* <div className="flex justify-between">
            <img
              onClick={() => {
                scrollFeatures(false);
              }}
              src="/images/home/arrow-left.png"
              className="cursor-pointer"
              alt="arrow left"
            />
            <img
              onClick={() => {
                scrollFeatures();
              }}
              src="/images/home/arrow-right.png"
              className="cursor-pointer"
              alt="arrow right"
            />
          </div> */}
        </div>
      </section>
      <section className="bg-white p-24 grid grid-cols-12">
        <div className="col-start-2 col-end-12 grid grid-cols-12 items-center">
          <div
            className="relative col-span-5 bg-light-grey flex flex-col"
            style={{ height: "350px" }}
          >
            <div
              className="relative grid grid-cols-12 col-gap-5 mb-5"
              style={{ left: "-10%", width: "120%" }}
            >
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
            <div
              className="relative grid grid-cols-12 col-gap-5"
              style={{ left: "-10%", width: "120%" }}
            >
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
          <div className="col-start-8 col-end-13 flex flex-col justify-center text-justify pt-8 leading-7">
            <p className="text-2xl mb-4 font-semibold">Made For Ease</p>
            <p className="mb-5">
              Maui comes equiped with a convenience telegram bot through which
              users can add and view expenses without having to open up the app.
              MauiBot however is not enabled by default for Maui users. To
              enable MauiBot simply visit him and follow his prompts.
            </p>
            <div style={{ width: "fit-content" }}>
              <Button>MauiBot</Button>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-revolver-purple px-24 py-16 flex justify-between text-white">
        <div className="flex flex-col md:w-48 lg:w-64 text-justify">
          <p className="text-xl mb-3">Maui</p>
          <p>
            Maui ships with a number of features designed to provide you with
            the best expense tracking experience possible.
          </p>
        </div>
        <div class="flex flex-col">
          <p class="text-xl mb-3">Contact</p>
          <p class="mb-3">
            3, Bisi Awosika street, Ologolo, Lekki
          </p>
          <p class="mb-3">
            +2348179868840
          </p>
          <p class="m-0">
            <a href="mailto:olamileke.dev@gmail.com">olamileke.dev@gmail.com</a>
          </p>
        </div>
        <div class="flex flex-col">
          <p class="text-xl mb-3">Social Media</p>
          <p class="mb-3">
            <a href="http://facebook.com" target="blank">
              Facebook
            </a>
          </p>
          <p class="mb-3">
            <a href="http://twitter.com/f_olamileke" target="blank">
              Twitter
            </a>
          </p>
          <p class="m-0">
            <a href="http://instagram.com/f_olamileke" target="blank">
              Instagram
            </a>
          </p>
        </div>
      </section>
    </div>
  );
};

export default Home;
