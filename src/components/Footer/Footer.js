import React from "react";

const Footer = () => (
  <section className="bg-revolver-purple px-8 sm:px-12 md:px-24 py-16 flex flex-col bmd:flex-row justify-between text-white quicksand">
    <div className="flex flex-col mb-3 bmd:mb-0 w-full bmd:w-48 lg:w-64 text-justify">
      <p className="text-xl mb-3 bmd:mb-4">MAUI</p>
      <p className="leading-7">
        The financial tracking tool you never knew you needed. Know what you spent
        on any day of any month of any year.
      </p>
    </div>
    <div className="flex flex-col mb-5 bmd:mb-0">
      <p className="text-xl mb-3 bmd:mb-4">CONTACT</p>
      <p className="mb-4">
        <i className="fas fa-map-marker-alt mr-4"></i>
        3, Bisi Awosika street, Ologolo, Lekki
      </p>
      <p className="mb-4">
        <i className="fas fa-phone-alt mr-3"></i>
        +2348179868840
      </p>
      <p className="m-0">
        <i className="fa fa-envelope mr-3 relative" style={{ top: "1px" }}></i>
        <a href="mailto:olamileke.dev@gmail.com">olamileke.dev@gmail.com</a>
      </p>
    </div>
    <div className="flex flex-col">
      <p className="text-xl mb-3 bmd:mb-4">SOCIAL MEDIA</p>
      <p className="mb-4">
        <i className="fab fa-facebook mr-3"></i>
        <a href="http://facebook.com" target="blank">
          Facebook
        </a>
      </p>
      <p className="mb-4">
        <i className="fab fa-twitter mr-3"></i>
        <a href="http://twitter.com/f_olamileke" target="blank">
          Twitter
        </a>
      </p>
      <p className="m-0">
        <i className="fab fa-instagram mr-4"></i>
        <a href="http://instagram.com/f_olamileke" target="blank">
          Instagram
        </a>
      </p>
    </div>
  </section>
);

export default Footer;
