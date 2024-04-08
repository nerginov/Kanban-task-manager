import React from "react";
import styles from "./DeleteModal.module.scss";
import ModalWrapper from "./modalwrapper/ModalWrapper";
import { useContext } from "react";
import { appContext } from "../../context/context";

const DeleteModal = ({ type, title }) => {
  const { closeModal, deleteActiveBoard, deleteActiveTask } =
    useContext(appContext);

  return (
    <ModalWrapper className={styles["delete"]}>
      <h2>Delete this {type}?</h2>
      <p>
        Are you sure you want to delete the {`'${title}'`} {type} and its{" "}
        {type === "task" ? "subtasks" : "tasks"}? This action will remove the{" "}
        {type} and cannot be reversed.
      </p>
      <div className={styles["delete__actions"]}>
        <button
          className={styles["delete__actions__delete-button"]}
          onClick={() =>
            type === "task" ? deleteActiveTask() : deleteActiveBoard()
          }
        >
          Delete
        </button>
        <button
          className={styles["delete__actions__cancel-button"]}
          onClick={() => closeModal()}
        >
          Cancel
        </button>
      </div>
    </ModalWrapper>
  );
};

export default DeleteModal;
