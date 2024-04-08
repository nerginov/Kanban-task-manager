import React from "react";
import styles from "./Column.module.scss";

const Column = ({ children, columnName, tasksNumber }) => {
  return (
    <div className={styles.column}>
      <h2 className={styles["column__name"]}>
        {columnName}({tasksNumber})
      </h2>
      {children}
    </div>
  );
};

export default Column;
