export interface Sprint {
  id: number;
  name: string;
  startDate: string;
  endDate: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  sprintId?: number;
}

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
}

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  containerClass?: string;
}
export type TaskStatus = 'Pendiente' | 'En Proceso' | 'Completo';
export type ButtonVariant = 'primary' | 'secondary' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';


