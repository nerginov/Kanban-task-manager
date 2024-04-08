import React, { useEffect, useState, useContext } from "react";
import boardIcon from "../../assets/icon-board.svg";
import styles from "./SideBar.module.scss";
import Switch from "./Switch";
import logoDesktopLight from "../../assets/logo-light.svg";
import logoDesktopDark from "../../assets/logo-dark.svg";
import hideIcon from "../../assets/icon-hide-sidebar.svg";
import useWindowResize from "../../hooks/useWindowResize";
import CreateBoard from "../modals/CreateBoard";
import { appContext } from "../../context/context";
import { createPortal } from "react-dom";

const SideBar = () => {
  const windowWidth = useWindowResize();
  const { boardNames, activeBoard, handleActiveBoard,activeModal,openModal } = useContext(appContext);

  // Set initial active board button index
  useEffect(() => {
    if (boardNames) {
      const activeIndex = boardNames.findIndex(
        (name) => name === activeBoard.name
      );
      if (activeIndex !== -1) {
        setClickedButtonIndex(activeIndex);
      }
    }
  }, [activeBoard, boardNames]);

  const [clickedButtonIndex, setClickedButtonIndex] = useState();
  const handleBoardButton = (index) => {
    setClickedButtonIndex(index);
  };

  return (
    <>
    <aside>
      <div className={styles["sidebar-content"]}>
        {windowWidth > 767 ? (
          <div className={styles["logo-container"]}>
            <img src={logoDesktopDark} alt="" />
          </div>
        ) : (
          ""
        )}

        <div className={styles.boards}>
          <h2 className={styles["boards__title"]}>
            ALL BOARDS ({boardNames ? boardNames.length : "0"})
          </h2>
          {boardNames &&
            boardNames.map((name, index) => (
              <button
                key={index}
                className={`${styles["boards__board-button"]} ${
                  clickedButtonIndex === index &&
                  styles["boards__board-button--active"]
                }`}
                onClick={() => {
                  handleBoardButton(index);
                  handleActiveBoard(name);
                }}
              >
                <img src={boardIcon} alt="board icon" /> {name}
              </button>
            ))}
          <button
            className={`${styles["boards__board-button"]} ${styles["boards__board-button--create"]}`}onClick={()=>openModal('createBoard')}
          >
            <img src={boardIcon} alt="board icon" 
            /> + Create New Board
          </button>
        </div>

        <div className={styles["additional-actions"]}>
          <Switch></Switch>
          {windowWidth > 767 ? (
            <button className={styles["additional-actions__hide-button"]}>
              <img src={hideIcon} alt="hide icon" /> Hide Sidebar
            </button>
          ) : (
            " "
          )}
        </div>
      </div>
    </aside>
    {activeModal === "createBoard" &&
    createPortal(<CreateBoard />, document.getElementById("root"))}
    </>
  );
};

export default SideBar;
