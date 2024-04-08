import React, { useState } from "react";
import styles from "./CreateBoard.module.scss";
import ModalWrapper from "./modalwrapper/ModalWrapper";
import crossIcon from "../../assets/icon-cross.svg";
import { useContext } from "react";
import { appContext } from "../../context/context";

const CreateBoard = () => {
  const { data, setData, closeModal } = useContext(appContext);
  const [boardName, setBoardName] = useState("");
  const [columnNames, setColumnNames] = useState([""]);

  // Function to handle adding a new input field for column name
  const handleAddColumn = () => {
    setColumnNames([...columnNames, ""]);
  };

  // Function to handle updating column name
  const handleColumnNameChange = (index, value) => {
    const updatedColumnNames = [...columnNames];
    updatedColumnNames[index] = value;
    setColumnNames(updatedColumnNames);
  };

  // Function to handle removing a column
  const handleRemoveColumn = (index) => {
    const updatedColumnNames = [...columnNames];
    updatedColumnNames.splice(index, 1);
    setColumnNames(updatedColumnNames);
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (boardName.trim() === "") {
      alert("Please enter a board name.");
      return;
    }

    // Check if board name already exists
    if (data.boards.some((board) => board.name === boardName)) {
      alert("Board name must be unique.");
      return;
    }

    // Create new board object
    const newBoard = {
      name: boardName,
      columns: columnNames.map((columnName) => ({
        name: columnName,
        tasks: [],
      })),
    };

    // Update data state with the new board
    setData({
      ...data,
      boards: [...data.boards, newBoard],
    });

    // Reset form fields and close modal
    setBoardName("");
    setColumnNames([""]);
    closeModal();
  };

  return (
    <ModalWrapper className={styles["create-board"]}>
      <h2>Add New Board</h2>
      <form
        action=""
        className={styles["create-board__form"]}
        onSubmit={handleSubmit}
      >
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          placeholder="Enter board name"
          value={boardName}
          onChange={(e) => setBoardName(e.target.value)}
        />

        <fieldset>
          <legend>Columns</legend>
          {columnNames.map((columnName, index) => (
            <div key={index} className={styles["column-input"]}>
              <input
                type="text"
                placeholder="Enter column name"
                value={columnName}
                onChange={(e) => handleColumnNameChange(index, e.target.value)}
              />
              <button
                type="button"
                className={styles["remove-column-button"]}
                onClick={() => handleRemoveColumn(index)}
                disabled={columnNames.length === 1}
              >
                <img src={crossIcon} alt="Remove column" />
              </button>
            </div>
          ))}
          <button
            type="button"
            className={styles["add-column-button"]}
            onClick={handleAddColumn}
          >
            + Add New Column
          </button>
        </fieldset>

        <button type="submit" className={styles["create-board-button"]}>
          Create Board
        </button>
      </form>
    </ModalWrapper>
  );
};

export default CreateBoard;
