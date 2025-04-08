export interface ICreateTask {
  titulo: string;
  description: string;
  fechaLimite: string;
  status: ""|'pendiente' | 'proceso' | 'completo';
}
