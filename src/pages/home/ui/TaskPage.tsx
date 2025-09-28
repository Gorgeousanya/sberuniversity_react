import React from 'react'
import styles from "./TaskPage.module.css";
import TaskWidget from 'widgets/task/TaskWidget';

export default function TaskPage() {
  return (
    <div className={styles.page}>
        <h1>Мои задачи</h1>
        <TaskWidget/>
    </div>
  )
}
