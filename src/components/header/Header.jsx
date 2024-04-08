import styles from "./Header.module.scss";
import addIconMobile from "../../assets/icon-add-task-mobile.svg";
import logoMobile from "../../assets/logo-mobile.svg";
import ellipsisIcon from "../../assets/icon-vertical-ellipsis.svg";
import chevronDown from "../../assets/icon-chevron-down.svg";
import React from "react";
import { createPortal } from "react-dom";
import useWindowResize from "../../hooks/useWindowResize";
import { useContext, useEffect } from "react";
import { appContext } from "../../context/context";
import EditBoardModal from "../../components/modals/EditBoardModal";
import DeleteModal from "../../components/modals/DeleteModal";
import EditModal from "../../components/modals/EditModal";
import AddTaskModal from "../modals/AddTaskModal";
import EditTaskModal from "../modals/EditTaskModal";

const Header = () => {
  const windowWidth = useWindowResize();
  const { openModal, activeBoard, activeModal, activeTaskName } =
    useContext(appContext);

  return (
    <>
      <header className={styles["main-header"]}>
        <div className={styles["main-header__content--left"]}>
          <div className={styles["main-header__logo-container"]}>
            {windowWidth < 768 ? (
              <img src={logoMobile} alt="logo-mobile" />
            ) : (
              ""
            )}
          </div>
          <div className={styles["main-header__board-name"]}>
            <button className={styles["main-header__board-name-button"]}>
              {activeBoard.name}
              {windowWidth < 768 ? (
                <img src={chevronDown} alt="Chevron down icon" />
              ) : (
                ""
              )}
            </button>
          </div>
        </div>
        <div className={styles["main-header__content--right"]}>
          <button
            className={styles["main-header__add-button"]}
            onClick={(e) => {
              e.preventDefault();
              openModal("addTask");
            }}
          >
            {windowWidth < 768 ? (
              <img src={addIconMobile} alt="add icon" />
            ) : (
              "+ Add New Task"
            )}
          </button>
          <button
            className={styles["main-header__edit-button"]}
            onClick={(e) => {
              e.preventDefault();
              openModal("editModal");
            }}
          >
            <img src={ellipsisIcon} alt="vertical ellipsis icon" />{" "}
          </button>
        </div>
      </header>
      {activeModal === "editModal" && <EditModal />}

      {activeModal === "editBoard" &&
        createPortal(<EditBoardModal />, document.getElementById("root"))}

      {activeModal === "addTask"
        ? createPortal(
            <AddTaskModal type={"add"} />,
            document.getElementById("root")
          )
        : activeModal === "editTask"
        ? createPortal(
            <EditTaskModal type={"edit"} />,
            document.getElementById("root")
          )
        : null}

      {activeModal === "delete"
        ? createPortal(
            <DeleteModal title={activeBoard.name} type="board" />,
            document.getElementById("root")
          )
        : activeModal === "deleteTask"
        ? createPortal(
            <DeleteModal title={activeTaskName} type="task" />,
            document.getElementById("root")
          )
        : null}
    </>
  );
};

export default Header;
