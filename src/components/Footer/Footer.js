import React from "react";

const Footer = () => (
  <section className="bg-revolver-purple px-24 py-16 flex justify-between text-white quicksand">
    <div className="flex flex-col md:w-48 lg:w-64 text-justify">
      <p className="text-xl mb-4">MAUI</p>
      <p className="leading-7">
        Maui ships with a number of features designed to provide you with the
        best expense tracking experience possible.
      </p>
    </div>
    <div class="flex flex-col">
      <p class="text-xl mb-4">CONTACT</p>
      <p class="mb-4">
        <i class="fas fa-map-marker-alt mr-4"></i>
        3, Bisi Awosika street, Ologolo, Lekki
      </p>
      <p class="mb-4">
        <i class="fas fa-phone-alt mr-3"></i>
        +2348179868840
      </p>
      <p class="m-0">
        <i class="fa fa-envelope mr-3 relative" style={{ top: "1px" }}></i>
        <a href="mailto:olamileke.dev@gmail.com">olamileke.dev@gmail.com</a>
      </p>
    </div>
    <div class="flex flex-col">
      <p class="text-xl mb-4">SOCIAL MEDIA</p>
      <p class="mb-4">
        <i class="fab fa-facebook mr-3"></i>
        <a href="http://facebook.com" target="blank">
          Facebook
        </a>
      </p>
      <p class="mb-4">
        <i class="fab fa-twitter mr-3"></i>
        <a href="http://twitter.com/f_olamileke" target="blank">
          Twitter
        </a>
      </p>
      <p class="m-0">
        <i class="fab fa-instagram mr-4"></i>
        <a href="http://instagram.com/f_olamileke" target="blank">
          Instagram
        </a>
      </p>
    </div>
  </section>
);

export default Footer;
