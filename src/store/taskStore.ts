import { create } from 'zustand';
import { Task, TaskStatus } from '../types/types';
import { TasksApi } from '../http/TasksApi';

interface TaskState {
  tasks: Task[];
  activeTask: Task | null;
  setTasks: (tasks: Task[]) => void;
  addTask: (task: Omit<Task, 'id'>) => Promise<void>;
  updateTaskStatus: (taskId: number, newStatus: TaskStatus) => Promise<void>;
  setActiveTask: (task: Task | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  activeTask: null,
  setTasks: (tasks) => set({ tasks }),
  
  addTask: async (taskData: Omit<Task, 'id'>) => {
    try {
      const tempTask: Task = {
        ...taskData,
        status: taskData.status || 'Pendiente',
        id: 0,
      };

      const response = await TasksApi.create(tempTask);
      set((state) => ({ tasks: [...state.tasks, response.data] }));
    } catch (error) {
      console.error("Error adding task:", error);
      throw error;
    }
  },

  updateTaskStatus: async (taskId: number, newStatus: TaskStatus) => {
    try {
      set((state) => {

        const taskToUpdate = state.tasks.find(task => task.id === taskId);
        if (!taskToUpdate) {
          console.error(`Task with ID ${taskId} not found`);
          return state;
        }

        TasksApi.update(taskId, { ...taskToUpdate, status: newStatus });

        return {
          tasks: state.tasks.map(task =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        };
      });
    } catch (error) {
      console.error("Error updating task:", error);
    }
  },

  setActiveTask: (task) => set({ activeTask: task }),
}));
