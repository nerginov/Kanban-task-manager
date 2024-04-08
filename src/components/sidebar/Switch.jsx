import React, { useState, useEffect } from "react";
import styles from "./Switch.module.scss";
import darkIcon from "../../assets/icon-dark-theme.svg";
import lightIcon from "../../assets/icon-light-theme.svg";

const Switch = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", `theme-${theme}`);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <div className={styles["switch-container"]}>
      <img src={lightIcon} alt="light icon" />
      <label className={styles["switch"]}>
        <input
          type="checkbox"
          id="switch"
          checked={theme === "dark"}
          onChange={toggleTheme}
        ></input>
        <span className={styles["slider"]}></span>
      </label>
      <img src={darkIcon} alt="dark icon" />
    </div>
  );
};

export default Switch;
