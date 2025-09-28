import { useCallback, useMemo, useState } from "react";
import { Task } from "entities/task/model/types";

const initialTasks: Task[] = [
  { id: 1, title: "Позавтракать", completed: false },
  { id: 2, title: "Сделать домашнее задание", completed: true },
  { id: 3, title: "Купить продукты", completed: false },
  { id: 4, title: "Распечатать документы", completed: false },
];

export type Filter = 'all' | 'completed' | 'incompleted';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [filter, setFilter] = useState<Filter>('all');

  const deleteTask = useCallback((id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  }, []);
  

  const filteredTasks = useMemo(() => {
    return filter === 'all' ?
     tasks :
     tasks.filter(task =>
      filter === 'completed' ? task.completed : !task.completed
    )
  }, [tasks, filter]);
  
  return {
    tasks: filteredTasks,
    filter: filter,
    setFilter,
    deleteTask
  };
}