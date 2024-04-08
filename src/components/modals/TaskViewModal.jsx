import React, { useEffect, useState } from "react";
import styles from "./TaskViewModal.module.scss";
import ellipsisIcon from "../../assets/icon-vertical-ellipsis.svg";
import ModalWrapper from "./modalwrapper/ModalWrapper";
import { appContext } from "../../context/context";
import { useContext } from "react";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

const TaskViewModal = ({
  totalSubTasks,
  doneSubTasks,
  taskTitle,
  taskDescription,
  currentStatus,
  statuses,
  subTasks,
  task,
}) => {
  const { data, setData, activeBoard, setActiveTaskName } =
    useContext(appContext);
  const [status, setStatus] = useState(currentStatus);
  setActiveTaskName(taskTitle);

  //implement a separate state for the inner modal
  const [innerModal, setInnerModal] = useState(false);
  const toggleInnerModal = () => {
    setInnerModal(!innerModal);
  };

  // Function to handle toggling the completion status of a subtask
  const handleToggleSubtaskCompletion = (subtask) => {
    // Make a copy of the data object to avoid mutating state directly
    const updatedData = {
      ...data,
      boards: data.boards.map((board) => ({
        ...board,
        columns: board.columns.map((column) => ({
          ...column,
          tasks: column.tasks.map((task) => ({
            ...task,
            subtasks: task.subtasks.map((item) =>
              item.title === subtask.title
                ? { ...item, isCompleted: !item.isCompleted }
                : item
            ),
          })),
        })),
      })),
    };

    // Update the data state with the updated subtasks
    setData(updatedData);
  };

  const handleStatusChange = (newStatus, taskTitle) => {
    const activeColumn = activeBoard.columns.find(
      (column) => column.name.toLowerCase() === newStatus.toLowerCase()
    ); // Find the column with the corresponding name

    if (activeColumn) {
      const updatedData = {
        ...data,
        boards: data.boards.map((board) => {
          if (board.isActive) {
            return {
              ...board,
              columns: board.columns.map((column) => {
                if (column === activeColumn) {
                  // Move the task to the active column
                  return {
                    ...column,
                    tasks: [
                      ...column.tasks,
                      {
                        title: taskTitle,
                        description: taskDescription,
                        status: newStatus,
                        subtasks: subTasks,
                      },
                    ],
                  };
                } else {
                  // Remove the task from other columns if it exists
                  return {
                    ...column,
                    tasks: column.tasks.filter(
                      (task) => task.title !== taskTitle
                    ),
                  };
                }
              }),
            };
          } else {
            return board;
          }
        }),
      };

      setData(updatedData);
    }
  };

  return (
    <>
      <ModalWrapper className={styles["task-view"]}>
        <header>
          <h2>{taskTitle}</h2>
          <button onClick={() => toggleInnerModal()}>
            <img src={ellipsisIcon} alt="vertical ellipsis icon" />
          </button>
          {innerModal && (
            <EditModal
              className={styles["task-edit"]}
              target="task"
              task={task}
            ></EditModal>
          )}
        </header>
        <div className={styles["task-view__description"]}>
          <p>{taskDescription}</p>
        </div>

        <fieldset className={styles["task-view__subtasks"]}>
          <legend>
            Subtasks({doneSubTasks} of {totalSubTasks})
          </legend>
          {subTasks &&
            subTasks.map((subtask, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  name=""
                  id={subtask.title}
                  checked={subtask.isCompleted}
                  onClick={() => handleToggleSubtaskCompletion(subtask)}
                />
                <label htmlFor={subtask.title}>{subtask.title}</label>
              </div>
            ))}
        </fieldset>
        <label htmlFor="status" className={styles["task-view__status-label"]}>
          Current Status
        </label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value);
            handleStatusChange(e.target.value, taskTitle);
          }}
        >
          {" "}
          {statuses.map((status, index) => (
            <option value={status} key={index}>
              {status}
            </option>
          ))}
        </select>
      </ModalWrapper>
    </>
  );
};

export default TaskViewModal;
