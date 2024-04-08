import React from "react";
import styles from "./Task.module.scss";
import TaskViewModal from "../modals/TaskViewModal";
import { appContext } from "../../context/context";
import { useContext } from "react";
import { createPortal } from "react-dom";
import DeleteModal from "../modals/DeleteModal";

const Task = ({
  task,
  taskTitle,
  subTasks,
  totalSubTasks,
  doneSubTasks,
  taskDescription,
  taskStatus,
  columnNames,
  currentStatus,
  statuses,
}) => {
  const { activeModal, openModal } = useContext(appContext);

  return (
    <>
      <button
        className={styles.task}
        onClick={() => openModal(taskTitle)}
        draggable
      >
        {taskTitle}
        <span className={styles["task__count"]}>
          {doneSubTasks} out of {totalSubTasks} subtasks
        </span>
      </button>
      {activeModal === taskTitle &&
        createPortal(
          <TaskViewModal
            task={task}
            taskTitle={taskTitle}
            taskDescription={taskDescription}
            taskStatus={taskStatus}
            totalSubTasks={totalSubTasks}
            doneSubTasks={doneSubTasks}
            subTasks={subTasks}
            columnNames={columnNames}
            currentStatus={currentStatus}
            statuses={statuses}
          />,
          document.getElementById("root")
        )}
    </>
  );
};

export default Task;
