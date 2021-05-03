import React from "react";
import Spinner from "../Spinner/Spinner";

const DataFetching = ({ display }) => {
  return (
    <div
      className={`absolute top-0 left-0 w-full h-full bg-white flex justify-center items-center transition-opacity duration-500 ease-in ${
        display ? "z-10 opacity-100" : "z--9999 opacity-0"
      }`}
    >
      <Spinner display={true} fixed={false} />
    </div>
  );
};

export default DataFetching;
