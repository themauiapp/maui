import React from "react";
import "./Feature.css";

const Feature = ({ name, description, image_url }) => {
  return (
    <div className="feature relative shadow flex flex-col flex-shrink-0">
      <img src={image_url} className="object-cover w-full" alt={name} />

      <div className="absolute left-0 mx-5 mb-5 p-6 bg-white flex flex-col justify-center">
        <p className="mb-2 font-semibold">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Feature;
