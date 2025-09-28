import { TaskCard } from "entities/task/ui/TaskCard";
import styles from "./TaskList.module.css";
import { useTasks } from "../model/useTasks";
import { FilterButton } from "shared/ui/FilterButton";


export default function TaskList() {
  const { tasks, setFilter, deleteTask } = useTasks();

  return (
    <div>
      <FilterButton setFilter={setFilter}/> 
        <div className={styles.tasks}>
        {tasks.map(task => (
          <TaskCard key={task.id} task={task} action={deleteTask} />
        ))}
      </div>
    </div>
  );
}