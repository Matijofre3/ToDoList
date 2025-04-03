import { useEffect } from 'react';
import { syncTasks } from '../data/dbController';

export const useTasksLoader = () => {
  useEffect(() => {
    syncTasks();
  }, []);
};