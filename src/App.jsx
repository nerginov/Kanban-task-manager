import { useState, useContext } from "react";
import styles from "./App.module.scss";
import Header from "./components/header/Header";
import Board from "./components/board/Board";
import SideBar from "./components/sidebar/SideBar";

import AddTaskModal from "./components/modals/AddTaskModal";
import TaskViewModal from "./components/modals/TaskViewModal";
import { createPortal } from "react-dom";
import useWindowResize from "./hooks/useWindowResize";
import { appContext } from "./context/context";

function App() {
  const windowWidth = useWindowResize();
  const { activeModal } = useContext(appContext);
  return (
    <>
      <div className={styles.app} id="dark-mode">
        <Header />
        {windowWidth > 767 ? (
          <SideBar />
        ) : (
          createPortal(<SideBar />, document.getElementById("root"))
        )}
        <Board />
      </div>

      {/*modals*/}

      {/* {activeModal === "taskView" &&
        createPortal(<TaskViewModal />, document.getElementById("root"))} */}
    </>
  );
}

export default App;
