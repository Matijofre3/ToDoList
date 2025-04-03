
import { TasksApi } from '../http/TasksApi';
import { useTaskStore } from '../store/taskStore';

export const syncTasks = async () => {
  try {
    const response = await TasksApi.getAll();
    useTaskStore.getState().setTasks(response.data);
  } catch (error) {
    console.error('Error syncing tasks:', error);
  }
};