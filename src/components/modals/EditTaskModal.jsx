import React, { useState, useEffect } from "react";
import styles from "./EditTaskModal.module.scss";
import crossIcon from "../../assets/icon-cross.svg";
import ModalWrapper from "./modalwrapper/ModalWrapper";
import { appContext } from "../../context/context";
import { useContext } from "react";

const EditTaskModal = () => {
  const { activeBoard, data, setData, closeModal, activeTaskName } =
    useContext(appContext);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [status, setStatus] = useState("");
  const [subtasks, setSubtasks] = useState([""]);

  useEffect(() => {
    if (activeTaskName) {
      const task = findTask(activeTaskName);
      if (task) {
        setTaskTitle(task.title);
        setTaskDescription(task.description);
        setStatus(task.status);
        setSubtasks(task.subtasks.map((subtask) => subtask.title));
      }
    }
  }, [activeTaskName]);

  const findTask = (taskName) => {
    for (const board of data.boards) {
      if (board.name === activeBoard.name) {
        for (const column of board.columns) {
          for (const task of column.tasks) {
            if (task.title === taskName) {
              return task;
            }
          }
        }
      }
    }
    return null;
  };

  // Function to handle adding a new subtask input
  const handleAddSubtask = () => {
    setSubtasks([...subtasks, ""]);
  };

  // Function to handle updating a subtask
  const handleSubtaskChange = (index, value) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks[index] = value;
    setSubtasks(updatedSubtasks);
  };

  // Function to handle removing a subtask
  const handleRemoveSubtask = (index) => {
    const updatedSubtasks = [...subtasks];
    updatedSubtasks.splice(index, 1);
    setSubtasks(updatedSubtasks);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Check if status is not chosen or title is empty
    if (!status || status.trim() === "" || taskTitle.trim() === "") {
      return;
    }

    // Filter out empty subtask titles
    const nonEmptySubtasks = subtasks.filter(
      (subtaskTitle) => subtaskTitle.trim() !== ""
    );

    // Create an array of subtasks objects with titles from the input values
    const updatedSubtasks = nonEmptySubtasks.map((subtaskTitle) => ({
      title: subtaskTitle,
      isCompleted: false, // Assuming all subtasks are initially not completed
    }));

    // Update the task in the data
    const updatedTask = {
      ...findTask(activeTaskName), // Get the current task to update
      title: taskTitle,
      description: taskDescription,
      status: status,
      subtasks: updatedSubtasks,
    };

    const updatedData = {
      ...data,
      boards: data.boards.map((board) => {
        if (board.name === activeBoard.name) {
          return {
            ...board,
            columns: board.columns.map((column) => {
              if (column.name.toUpperCase() === status.toUpperCase()) {
                return {
                  ...column,
                  tasks: column.tasks.map((t) =>
                    t.title === activeTaskName ? updatedTask : t
                  ),
                };
              } else {
                return column;
              }
            }),
          };
        } else {
          return board;
        }
      }),
    };

    setData(updatedData);
    closeModal();
  };

  return (
    <ModalWrapper className={styles["edit-task"]}>
      <h2>Edit Task</h2>
      <form
        action=""
        className={styles["add-task-form"]}
        onSubmit={handleSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          placeholder="e.g. Make a coffee"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
        />

        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          id="description"
          cols="30"
          rows="3"
          placeholder="e.g. Brew a fresh cup of coffee and enjoy it in the morning sun"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        ></textarea>

        <fieldset>
          <legend>Subtasks</legend>
          {subtasks.map((subtask, index) => (
            <div key={index}>
              <input
                type="text"
                placeholder="e.g. Grind coffee beans"
                value={subtask}
                onChange={(e) => handleSubtaskChange(index, e.target.value)}
              />
              <button
                type="button"
                onClick={() => handleRemoveSubtask(index)}
                className={styles["add-task-form__subtask-delete-button"]}
                disabled={subtasks.length === 1}
              >
                <img src={crossIcon} alt="cross icon" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles["add-task-form__subtask-add-button"]}
            onClick={handleAddSubtask}
          >
            +Add New Subtask
          </button>
        </fieldset>

        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="" disabled>
            Select Status
          </option>
          {activeBoard.columns.map((column, index) => (
            <option key={index} value={column.name}>
              {column.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className={styles["add-task-form__task--save-changes"]}
          disabled={!status || status.trim() === ""}
        >
          Save Changes
        </button>
      </form>
    </ModalWrapper>
  );
};

export default EditTaskModal;
