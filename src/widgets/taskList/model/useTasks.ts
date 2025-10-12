import { useCallback, useMemo, useState, useEffect } from "react";
import { Task } from "entities/task/model/types";
import { useGetTasksQuery } from "entities/task/api/tasksApi";

export type Filter = 'all' | 'completed' | 'incompleted';

export function useTasks() {
  const { data: tasks = [] } = useGetTasksQuery();
  const [deleteTasks, setDeleteTasks] = useState<Task[]>([]);

  const [filter, setFilter] = useState<Filter>('all');

  const deleteTask = useCallback((id: number) => {
    setDeleteTasks(prev => prev.filter(task => task.id !== id));
  }, []);

  useEffect(() => {
    console.log(tasks, deleteTasks)
    if (deleteTasks.length > 0 && tasks.length === 0) {
      console.log(deleteTasks)
      setDeleteTasks(tasks);
    }
  }, [tasks, deleteTasks.length]);
  

  const filteredTasks = useMemo(() => {
    return filter === 'all' ?
     deleteTasks :
     deleteTasks.filter(task =>
      filter === 'completed' ? task.completed : !task.completed
    )
  }, [deleteTasks, filter]);
  
  return {
    tasks: filteredTasks,
    filter: filter,
    setFilter,
    deleteTask
  };
}