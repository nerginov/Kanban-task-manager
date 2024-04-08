import React, { useEffect } from "react";
import styles from "./EditModal.module.scss";
import { appContext } from "../../context/context";
import { useContext } from "react";

const EditModal = ({ target }) => {
  const { openModal } = useContext(appContext);

  return (
    <div className={styles["edit-modal"]}>
      <button
        className={`${styles["edit-modal__button"]} ${styles["edit-modal__button--edit"]}`}
        onClick={(e) => {
          {
            target === "task" ? openModal("editTask") : openModal("editBoard");
          }
          e.preventDefault();
        }}
      >
        {target === "task" ? "Edit Task" : "Edit Board"}
      </button>
      <button
        className={`${styles["edit-modal__button"]} ${styles["edit-modal__button--delete"]}`}
        onClick={(e) => {
          target === "task" ? openModal("deleteTask") : openModal("delete");
          e.preventDefault();
        }}
      >
        {target === "task" ? "Delete Task" : "Delete Board"}
      </button>
    </div>
  );
};

export default EditModal;
