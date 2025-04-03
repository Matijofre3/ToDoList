import { useDroppable } from '@dnd-kit/core';
import TaskCard from './TaskCard';
import { Task, TaskStatus } from '../../types/types';

interface StatusColumnProps {
  status: TaskStatus;
  tasks: Task[];
}

const StatusColumn = ({ status, tasks }: StatusColumnProps) => {
  const { setNodeRef } = useDroppable({ id: status, data: { status } });

  return (
    <div ref={setNodeRef} className="status-column">
      <h3>{status}</h3>
      <div className="tasks-container">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default StatusColumn;