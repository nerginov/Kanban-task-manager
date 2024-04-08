import { createContext, useState, useEffect } from "react";
import jsonData from "../data.json";

export const appContext = createContext();

export const AppContextProvider = ({ children }) => {
  const [activeTaskName, setActiveTaskName] = useState("");
  // Get or set the data depending on local storage state
  const getOrSetDataFromLocal = (jsonData) => {
    const storedData = localStorage.getItem("data");

    if (!storedData) {
      localStorage.setItem("data", JSON.stringify(jsonData));

      return jsonData;
    }

    return JSON.parse(storedData);
  };

  const [data, setData] = useState(getOrSetDataFromLocal(jsonData));

  // Use useEffect to watch for changes in data state and update local storage
  useEffect(() => {
    setActiveBoard(
      data
        ? data.boards.find((board) => board.isActive) || data.boards[0] || null
        : null
    );
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  //store board names
  const boardNames = data && data.boards.map((board) => board.name);

  // Find the active board and set it in state
  const [activeBoard, setActiveBoard] = useState(
    data
      ? data.boards.find((board) => board.isActive) || data.boards[0] || null
      : null
  );
  useEffect(() => {}, [activeBoard]);

  //handle active board
  const handleActiveBoard = (name) => {
    //shallow copy each board and update only isActive if board.name === passed name;
    const updatedBoards = data.boards.map((board) => ({
      ...board,
      isActive: board.name === name,
    }));
    //upadate the local storage with the updated data
    setData({ ...data, boards: updatedBoards });
    //store the active board in state
    setActiveBoard(updatedBoards.find((board) => board.isActive));
  };
  const deleteActiveTask = () => {
    const updatedTasks = activeBoard.columns.reduce((acc, column) => {
      const filteredTasks = column.tasks.filter(
        (task) => task.title !== activeTaskName
      );
      return [...acc, ...filteredTasks];
    }, []);

    const updatedColumns = activeBoard.columns.map((column) => ({
      ...column,
      tasks: column.tasks.filter((task) => task.title !== activeTaskName),
    }));

    const updatedBoards = data.boards.map((board) =>
      board.name === activeBoard.name
        ? { ...board, columns: updatedColumns }
        : board
    );

    const updatedData = {
      ...data,
      boards: updatedBoards,
    };

    setData(updatedData);
    setActiveBoard({ ...activeBoard, columns: updatedColumns });
    setActiveTaskName(null); // Reset active task name
    closeModal(); // Close the modal after deletion
  };

  const deleteActiveBoard = () => {
    const updatedBoards = data.boards.filter(
      (board) => board.name !== activeBoard.name
    );

    if (updatedBoards.length > 0) {
      const updatedData = {
        ...data,
        boards: updatedBoards,
      };

      // Set the active board to the first board in the updated list
      handleActiveBoard(updatedBoards[0].name);

      // Update state with the updated data
      setData(updatedData);
    } else {
      // If there are no remaining boards, remove data from local storage
      localStorage.removeItem("data");
      // Update state to null
      setData(null);
      // Set active board to null
      setActiveBoard(null);
    }

    // Close the modal after deletion
    closeModal();
  };

  const updateActiveBoard = (
    newName,
    newColumnNames,
    deletedColumnNames,
    additionalColumns
  ) => {
    // Update column names
    const updatedColumnNames = activeBoard.columns.map((column, index) => ({
      ...column,
      name: newColumnNames[index], // Update name if it exists
    }));

    // Filter out columns marked for deletion
    const updatedColumns = updatedColumnNames.filter(
      (column) => !deletedColumnNames.includes(column.name)
    );

    // Concatenate additional columns
    updatedColumns.push(...additionalColumns);

    const updatedData = {
      ...data,
      boards: data.boards.map((board) =>
        board.name === activeBoard.name
          ? { ...board, name: newName, columns: updatedColumns }
          : board
      ),
    };

    // Update state with the updated data
    setData(updatedData);
    setActiveBoard((prevBoard) => ({
      ...prevBoard,
      name: newName,
      columns: updatedColumns,
    }));
    closeModal();
  };

  // State variable to manage modal visibility
  const [activeModal, setActiveModal] = useState(null);

  // Function to open a modal
  const openModal = (modal) => {
    setActiveModal(modal);
  };

  // Function to close the active modal
  const closeModal = (e) => {
    setActiveModal(null);
  };

  const values = {
    activeTaskName,
    deleteActiveTask,
    setActiveTaskName,
    data,
    setData,
    deleteActiveBoard,
    updateActiveBoard,
    boardNames,
    activeBoard,
    handleActiveBoard,
    activeModal,
    setActiveModal,
    openModal,
    closeModal,
  };

  return <appContext.Provider value={values}>{children}</appContext.Provider>;
};
