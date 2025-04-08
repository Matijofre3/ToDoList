import React from 'react';
import styles from './SprintScreen.module.css';

import { useTaskStore } from '../../../store/taskStore';
import { TaskColumn } from '../../ui/Sprint/StatusTask/taskColumn';
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import { useSprintTasks } from '../../../hooks/useSprintTasks';
import { Header } from '../../ui/Header/Header';

const SPRINT_ID = "1";

export const SprintScreen: React.FC = () => {
  //const tareas = useTaskStore((state) => state.tasks);
  const { pendientes, enProceso, completas } = useSprintTasks(SPRINT_ID);
  const updateTask = useTaskStore((state) => state.updateTask);

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;
    if (!destination || destination.droppableId === source.droppableId) return;

    const newStatus = destination.droppableId as 'pendiente' | 'proceso' | 'completo';
    updateTask(draggableId, { status: newStatus });
  };

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <h2 className={styles.title}>Sprint</h2>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className={styles.columns}>
            <TaskColumn title="Pendiente" droppableId="pendiente" tasks={pendientes} />
            <TaskColumn title="En Proceso" droppableId="proceso" tasks={enProceso} />
            <TaskColumn title="Completo" droppableId="completo" tasks={completas} />
          </div>
        </DragDropContext>
      </div>
    </div>
  );
};
