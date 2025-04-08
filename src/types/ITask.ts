export interface ITask {
  id: string;
  titulo: string;
  name: string;
  description: string;
  fechaLimite: string;
  sprintId?: string;
  status: ""|'pendiente' | 'proceso' | 'completo';
}
