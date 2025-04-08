import { FC } from "react";
import { useTaskStore } from "../../../../store/taskStore";
import { ITask } from "../../../../types/ITask";



type Props = {
  onEditTask: (task: ITask) => void;
};

export const ListTasks: FC<Props> = ({ onEditTask }) => {
  const tareas = useTaskStore((state) => state.tareas);

  return (
    <>
      {tareas.map((task) => (
        <div key={task.id} className="task-card">
          <h4>{task.titulo}</h4>
          <p>{task.description}</p>
          <button onClick={() => onEditTask(task)}>Editar</button>
        </div>
      ))}
    </>
  );
};