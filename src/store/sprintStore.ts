import { create } from 'zustand';
import { Sprint } from '../types/types';
import { SprintsApi } from '../http/SprintsApi';

interface SprintState {
  sprints: Sprint[];
  activeSprint: Sprint | null;
  isLoading: boolean;
  error: string | null;
  setSprints: (sprints: Sprint[]) => void;
  addSprint: (sprint: Omit<Sprint, 'id'>) => Promise<void>;
  updateSprint: (sprintId: number, updates: Partial<Sprint>) => Promise<void>;
  deleteSprint: (sprintId: number) => Promise<void>;
  setActiveSprint: (sprint: Sprint | null) => void;
  fetchSprints: () => Promise<void>;
}

export const useSprintStore = create<SprintState>((set) => ({
  sprints: [],
  activeSprint: null,
  isLoading: false,
  error: null,

  setSprints: (sprints) => set({ sprints }),

  setActiveSprint: (sprint) => set({ activeSprint: sprint }),

  fetchSprints: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await SprintsApi.getAll();
      set({ sprints: response.data, isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to fetch sprints',
        isLoading: false 
      });
    }
  },

  addSprint: async (sprint) => {
    set({ isLoading: true, error: null });
    try {
      const response = await SprintsApi.create(sprint);
      set((state) => ({ 
        sprints: [...state.sprints, response.data],
        isLoading: false 
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to add sprint',
        isLoading: false 
      });
    }
  },

  updateSprint: async (sprintId, updates) => {
    set({ isLoading: true, error: null });
    try {
      await SprintsApi.update(sprintId, updates);
      set((state) => ({
        sprints: state.sprints.map(sprint => 
          sprint.id === sprintId ? { ...sprint, ...updates } : sprint
        ),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to update sprint',
        isLoading: false 
      });
    }
  },

  deleteSprint: async (sprintId) => {
    set({ isLoading: true, error: null });
    try {
      await SprintsApi.delete(sprintId);
      set((state) => ({
        sprints: state.sprints.filter(sprint => sprint.id !== sprintId),
        isLoading: false
      }));
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : 'Failed to delete sprint',
        isLoading: false 
      });
    }
  },
}));