import React from "react";
import "./Feature.css";

const Feature = ({ name, description, image_url }) => {
  return (
    <div className="feature relative shadow flex flex-col flex-shrink-0">
      <img
        src={image_url}
        className="object-cover w-full"
        alt={name}
        style={{ height: "400px" }}
      />

      <div
        className="absolute left-0 mx-5 mb-5 p-6 shadow-md bg-white flex flex-col justify-center"
        style={{ bottom: 0, background: "rgba(255,255,255,0.95)" }}
      >
        <p className="mb-2 font-semibold">{name}</p>
        <p>{description}</p>
      </div>
    </div>
  );
};

export default Feature;
