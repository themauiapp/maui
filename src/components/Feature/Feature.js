import React from "react";
import "./Feature.css";

const Feature = ({ name, description, image_url }) => {
  return (
    <div className="feature shadow flex flex-col flex-shrink-0">
      <div className="h-1/2">
        <img
          src={image_url}
          className="object-cover w-full"
          alt={name}
          style={{ height: "175px" }}
        />
      </div>
      <div className="h-1/2 p-5 bg-white flex flex-col justify-center items-center">
        <p className="font-semibold mb-3">{name}</p>
        <p className="text-center">{description}</p>
      </div>
    </div>
  );
};

export default Feature;
