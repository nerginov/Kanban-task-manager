import React from "react";
import styles from "./ModalWrapper.module.scss";
import { appContext } from "../../../context/context";
import { useContext } from "react";

const ModalWrapper = ({ children, className }) => {
  const { closeModal } = useContext(appContext);
  return (
    <div
      className={styles["modal-wrapper"]}
      onClick={(e) => {
        e.stopPropagation();
        closeModal();
      }}
    >
      <div
        className={`${styles["modal-wrapper__content"]} ${className}`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
