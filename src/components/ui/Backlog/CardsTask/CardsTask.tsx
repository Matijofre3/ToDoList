import React from 'react';
import styles from './CardTask.module.css';
import { ITask } from '../../../../types/ITask';
import { Draggable } from '@hello-pangea/dnd';


interface Props {
  task: ITask;
  index: number;
}

export const CardsTask: React.FC<Props> = ({ task, index }) => {
  return (
    <Draggable draggableId={task.id.toString()} index={index}>
      {(provided) => (
        <div
          className={styles.card}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h4>{task.name}</h4>
          <p>{task.description}</p>
        </div>
      )}
    </Draggable>
  );
};
