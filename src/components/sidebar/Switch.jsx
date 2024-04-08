import React, { useState } from "react";
import styles from "./Switch.module.scss";
import darkIcon from "../../assets/icon-dark-theme.svg";
import lightIcon from "../../assets/icon-light-theme.svg";

const Switch = () => {
  const [theme, setTheme] = useState("light");

  const handleThemeSwitch = () => {
    const root = document.documentElement;
    if (theme === "light") {
      root.setAttribute("data-theme", "theme-dark");
      setTheme("dark");
    } else {
      root.setAttribute("data-theme", "theme-light");
      setTheme("light");
    }
  };

  return (
    <div className={styles["switch-container"]}>
      <img src={lightIcon} alt="light icon" />
      <label className={styles["switch"]}>
        <input
          type="checkbox"
          id="switch"
          onClick={() => handleThemeSwitch()}
        ></input>
        <span className={styles["slider"]}></span>
      </label>
      <img src={darkIcon} alt="dark icon" />
    </div>
  );
};

export default Switch;
