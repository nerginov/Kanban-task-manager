import React, { useContext, useState, useEffect } from "react";
import styles from "./EditBoardModal.module.scss";
import crossIcon from "../../assets/icon-cross.svg";
import ModalWrapper from "./modalwrapper/ModalWrapper";
import { appContext } from "../../context/context";

const EditBoardModal = () => {
  const { activeBoard, updateActiveBoard } = useContext(appContext);

  const [deletedColumns, setDeletedColumns] = useState([]);
  const handleDeleteColumn = (columnName) => {
    setDeletedColumns((prevDeletedColumns) => [
      ...prevDeletedColumns,
      columnName,
    ]);
  };

  const [boardName, setBoardName] = useState(activeBoard.name);
  const handleBoardNameChange = (value) => {
    setBoardName(value);
  };

  const [columnNames, setColumnNames] = useState(
    activeBoard.columns.map((column) => column.name)
  );

  const handleColumnNameChange = (index, newName) => {
    setColumnNames((prevColumnNames) => {
      const updatedColumnNames = [...prevColumnNames];
      updatedColumnNames[index] = newName;
      return updatedColumnNames;
    });
  };

  // State variable for additional columns
  const [additionalColumns, setAdditionalColumns] = useState([]);

  // Function to add a new column
  const handleAddColumn = () => {
    setAdditionalColumns((prevColumns) => [
      ...prevColumns,
      { name: "" }, // You can include other properties of the column if needed
    ]);
  };

  return (
    <ModalWrapper className={styles["edit-board"]}>
      <h2>Edit Board</h2>
      <label htmlFor="name">Board Name</label>
      <input
        type="text"
        id="name"
        className={styles["edit-board__name-input"]}
        value={boardName}
        onChange={(e) => handleBoardNameChange(e.target.value)}
      />
      <fieldset>
        <legend>Board Columns</legend>
        {activeBoard.columns.map(
          (column, index) =>
            !deletedColumns.includes(column.name) && (
              <div key={index}>
                <label htmlFor={`column-${index}`}>Column</label>
                <input
                  type="text"
                  id={`column-${index}`}
                  value={columnNames[index]}
                  onChange={(e) =>
                    handleColumnNameChange(index, e.target.value)
                  }
                />
                <button
                  className={styles["edit-board-delete-button"]}
                  onClick={() => handleDeleteColumn(column.name)}
                >
                  <img src={crossIcon} alt="cross icon" />
                </button>
              </div>
            )
        )}

        {/* Render additional columns */}
        {additionalColumns.map((column, index) => (
          <div key={index}>
            <label htmlFor={`new-column-${index}`}>New Column</label>
            <input
              type="text"
              id={`new-column-${index}`}
              value={column.name}
              onChange={(e) => {
                const newColumns = [...additionalColumns];
                newColumns[index].name = e.target.value;
                setAdditionalColumns(newColumns);
              }}
            />
            <button
              className={styles["edit-board-delete-button"]}
              onClick={() =>
                setAdditionalColumns((prevColumns) =>
                  prevColumns.filter((_, i) => i !== index)
                )
              }
            >
              <img src={crossIcon} alt="cross icon" />
            </button>
          </div>
        ))}

        <button
          className={styles["edit-board__add-button"]}
          onClick={handleAddColumn}
        >
          + Add New Column
        </button>
      </fieldset>
      <button
        className={styles["edit-board__save-button"]}
        onClick={() => {
          const nonEmptyAdditionalColumns = additionalColumns.filter(
            (column) => column.name.trim() !== ""
          );
          updateActiveBoard(
            boardName,
            columnNames,
            deletedColumns,
            nonEmptyAdditionalColumns
          );
        }}
      >
        Save Changes
      </button>
    </ModalWrapper>
  );
};

export default EditBoardModal;
