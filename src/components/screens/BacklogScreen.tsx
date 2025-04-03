import { useState } from 'react';

import { Sprint, Task, TaskStatus } from '../../types/types';
import Button from '../../components/ui/Button';
import { useTaskStore } from '../../store/taskStore';
import CreateTaskModal from '../ui/CreateTaskModal';

const BacklogScreen = () => {
  const { tasks }: { tasks: Task[] } = useTaskStore();
  const { sprints }: { sprints: Sprint[] } = useSprintStore();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="backlog-container">
      <div className="header">
        <h1>Backlog de Tareas</h1>
        <Button onClick={() => setShowModal(true)}>Nueva Tarea</Button>
      </div>

      <div className="tasks-grid">
        {tasks.map((task: Task) => (
          <div key={task.id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <div className="task-meta">
              <span className={`status ${task.status.toLowerCase().replace(' ', '-')}`}>
                {task.status}
              </span>
              {task.sprintId && (
                <span className="sprint">
                  Sprint: {sprints.find((s: Sprint) => s.id === task.sprintId)?.name}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {showModal && <CreateTaskModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default BacklogScreen;
function useSprintStore(): { sprints: Sprint[]; } {
  throw new Error('Function not implemented.');
}

