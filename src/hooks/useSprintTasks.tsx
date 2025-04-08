import { useTaskStore } from "../store/taskStore";

export const useSprintTasks = (sprintId: string) => {
  const tareas = useTaskStore((state) => state.tareas);

  const pendientes = tareas.filter(
    (t) => t.sprintId === sprintId && t.status === "pendiente"
  );
  const enProceso = tareas.filter(
    (t) => t.sprintId === sprintId && t.status === "proceso"
  );
  const completas = tareas.filter(
    (t) => t.sprintId === sprintId && t.status === "completo"
  );

  return { pendientes, enProceso, completas };
};
