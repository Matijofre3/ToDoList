import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useState } from 'react';
import { DndContext, DragOverlay, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { arrayMove, sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { Task, TaskStatus } from '../../types/types';
import Button from '../ui/Button';
import { useTaskStore } from '../../store/taskStore';
import TaskCard from '../ui/TaskCard';
import StatusColumn from '../ui/StatusColumn';
import CreateSprintModal from '../ui/CreateSprintModal';

const SprintScreen = () => {
  const { sprints, activeSprint, setActiveSprint } = useSprintStore();
  const { tasks, updateTaskStatus } = useTaskStore();
  const [showSprintModal, setShowSprintModal] = useState(false);
  const [activeTask, setActiveTask] = useState<number | null>(null);

  const statusColumns: TaskStatus[] = ['Pendiente', 'En Proceso', 'Completo'];

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveTask(Number(event.active.id.toString()));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const originalTask = tasks.find(t => t.id === Number(active.id));
    const newStatus = over.data.current?.status as TaskStatus;

    if (originalTask && originalTask.status !== newStatus) {
      updateTaskStatus(Number(active.id), newStatus);
    }
    
    setActiveTask(null);
  };

  return (
    <div className="sprint-container">
      <div className="sprint-header">
        <div className="sprint-selector">
          {sprints.map((sprint: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
            <Button
              key={sprint.id}
              variant={activeSprint?.id === sprint.id ? 'primary' : 'secondary'}
              onClick={() => setActiveSprint(sprint)}
            >
              {sprint.name}
            </Button>
          ))}
          <Button onClick={() => setShowSprintModal(true)}>+ Nuevo Sprint</Button>
        </div>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="kanban-board">
          {statusColumns.map((status) => (
            <StatusColumn
              tasks={[]} key={status}
              status={status}
              {...tasks.filter((t: Task) => t.status === status && t.sprintId === activeSprint?.id)}            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <TaskCard 
              task={tasks.find(t => t.id === activeTask)!} 
              isDragging 
            />
          ) : null}
        </DragOverlay>
      </DndContext>

      {showSprintModal && <CreateSprintModal onClose={() => setShowSprintModal(false)} />}
    </div>
  );
};

export default SprintScreen;

function useSprintStore(): { sprints: any; activeSprint: any; setActiveSprint: any; } {
  throw new Error('Function not implemented.');
}
