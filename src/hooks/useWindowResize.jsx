import React, { useEffect } from "react";
import { useState } from "react";

const useWindowResize = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    //Callback function to handle window resize
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };
    //Add an event listener for the 'resize' event, calling 'handleResize' when it occurs.
    window.addEventListener("resize", handleWindowResize);

    //clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, [windowWidth]);
  return windowWidth;
};

export default useWindowResize;
