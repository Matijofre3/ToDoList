
import { Sprint } from '../types/types';

export const SprintsApi = {
  getAll: async (): Promise<{ data: Sprint[] }> => {
    return { data: [] };
  },
  create: async (sprint: Omit<Sprint, 'id'>): Promise<{ data: Sprint }> => {
    return { data: { ...sprint, id: Date.now() } };
  },
  update: async (id: number, updates: Partial<Sprint>): Promise<void> => {
  },
  delete: async (id: number): Promise<void> => {
  }
};