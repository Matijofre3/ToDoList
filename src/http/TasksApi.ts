import { Task } from '../types/types';
import api from './api';

export const TasksApi = {
  getAll: () => api.get('/tasks'),
  create: (task: Task) => api.post('/tasks', task),
  update: (id: number, task: Task) => api.put(`/tasks/${id}`, task),
  delete: (id: number) => api.delete(`/tasks/${id}`),
};