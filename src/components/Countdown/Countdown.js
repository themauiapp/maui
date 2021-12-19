import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";

const Countdown = () => {
  const [number, setNumber] = useState(3);
  const history = useHistory();

  useEffect(() => {
    const interval = setInterval(() => {
      if (number === 0) {
        return history.push("/");
      }
      setNumber(number - 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [number]);

  return (
    <div className="nunito relative w-full p-10 pb-24 flex flex-col items-center">
      <p className="text-xl nunito mb-4 text-center">Redirecting you in</p>
      <p>{number}</p>
      <div className="absolute bottom-0 left-0 w-full bg-light-grey text-gray-700 flex justify-center py-8" />
    </div>
  );
};

export default Countdown;
