import React from "react";
import styles from "./Board.module.scss";
import Column from "./Column";
import Task from "./Task";
import { appContext } from "../../context/context";
import { useContext } from "react";

const Board = () => {
  const { activeBoard, openModal } = useContext(appContext);

  return (
    <>
      <main className={styles.board}>
        <div>
          {activeBoard &&
            activeBoard.columns.map((column) => (
              <Column
                key={column.name}
                columnName={column.name}
                tasksNumber={column.tasks ? column.tasks.length : "0"}
              >
                {column.tasks &&
                  column.tasks.map((task) => (
                    <Task
                      task={task}
                      key={task.title}
                      openModal={openModal}
                      taskTitle={task.title}
                      taskDescription={task.description}
                      subTasks={task.subtasks}
                      totalSubTasks={task.subtasks.length}
                      doneSubTasks={task.subtasks.reduce((count, subtask) => {
                        return subtask.isCompleted ? count + 1 : count;
                      }, 0)}
                      currentStatus={task.status}
                      statuses={activeBoard.columns.map(
                        (column) => column.name
                      )}
                    />
                  ))}
              </Column>
            ))}
          <button
            className={styles["board__column-add-button"]}
            onClick={(e) => {
              openModal("editBoard");
              e.preventDefault();
            }}
          >
            + New Column
          </button>
        </div>
      </main>
    </>
  );
};

export default Board;
