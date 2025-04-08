import React from "react";
import { Droppable, Draggable } from "@hello-pangea/dnd";
import { ITask } from "../../../../types/ITask";
import styles from "./TaskColumn.module.css";

interface TaskColumnProps {
  title: string;
  droppableId: string;
  tasks: ITask[];
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ title, droppableId, tasks }) => {
  return (
    <div className={styles.column}>
      <h3>{title}</h3>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div
            className={styles.taskList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Draggable draggableId={task.id.toString()} index={index}>
                {(provided) => (
                  <div
                    className={styles.taskCard}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <strong>{task.titulo}</strong>
                    <p>{task.description}</p>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
