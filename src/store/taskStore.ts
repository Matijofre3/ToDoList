import { create } from "zustand";
import { ITask } from "../types/ITask";

interface TaskState {
  tareas: ITask[];
  tareaActiva: ITask | null;
  setArrayTareas: (tasks: ITask[]) => void;
  agregarNuevaTarea: (task: ITask) => void;
  eliminarUnaTarea: (id: string) => void;
  editarUnaTarea: (task: ITask) => void;
  updateTask: (id: string, data: Partial<ITask>) => void;
  setTareaActiva: (task: ITask | null) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  tareas: [],
  tareaActiva: null,

  setArrayTareas: (tasks) => set({ tareas: tasks }),

  agregarNuevaTarea: (task) =>
    set((state) => ({
      tareas: [...state.tareas, task],
    })),

  eliminarUnaTarea: (id) =>
    set((state) => ({
      tareas: state.tareas.filter((t) => t.id !== id),
    })),

  editarUnaTarea: (task) =>
    set((state) => ({
      tareas: state.tareas.map((t) => (t.id === task.id ? task : t)),
    })),

  updateTask: (id, data) =>
    set((state) => ({
      tareas: state.tareas.map((t) =>
        t.id === id ? { ...t, ...data } : t
      ),
    })),

  setTareaActiva: (task) => set({ tareaActiva: task }),
}));
