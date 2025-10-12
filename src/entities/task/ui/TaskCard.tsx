import React from 'react'
import { Task } from '../model/types'
import styles from "./TaskCard.module.css";

type Props = {
    task: Task;
    action: (id: number) => void;
  };
  
  function TaskCardComponent({ task, action }: Props) {
    return (
      <div className={styles.card}>
        <p className={styles.delete} onClick={()=>action(task.id)}>❌</p>
        <div className={styles.text}>
          <p>{task.title}</p> 
          {
            task.completed && 
            <p className={styles.completed}>✅</p> 
          }
        </div>
      </div>
    );
  }


  export const TaskCard = React.memo(TaskCardComponent);