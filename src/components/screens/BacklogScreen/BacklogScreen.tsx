import styles from './BacklogScreen.module.css';
import { SprintList } from '../../ui/Backlog/SprintListBackLog/SprintList';
import { ListTasks } from '../../ui/Backlog/ListTasks/ListTasks';
import { Header } from '../../ui/Header/Header';
import { useState } from "react";
import { ModalTask } from '../../ui/Backlog/ModalsBacklog/ModalTask';
import { ModalSprint } from '../../ui/Backlog/ModalsBacklog/ModalSprint';
import { useTaskStore } from '../../../store/taskStore';
import { sprintStore } from '../../../store/sprintBackLogStore';


export const BacklogScreen: React.FC = () => {
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [isSprintModalOpen, setIsSprintModalOpen] = useState(false);

  const setTareaActiva = useTaskStore(state => state.setTareaActiva);
  const setSprintActiva = sprintStore(state => state.setsprintActiva);

  const handleOpenTaskModal = () => {
    setTareaActiva(null); // aseguramos que sea modo "crear"
    setIsTaskModalOpen(true);
  };

  const handleOpenSprintModal = () => {
    setSprintActiva(null); // aseguramos que sea modo "crear"
    setIsSprintModalOpen(true);
  };

  const handleCloseTaskModal = () => setIsTaskModalOpen(false);
  const handleCloseSprintModal = () => setIsSprintModalOpen(false);

  return (
    <div className={styles.container}>
      <Header />
      <div className={styles.body}>
        <div className={styles.sidebar}>
          <button className={styles.newSprintBtn} onClick={handleOpenSprintModal}>
            Nuevo Sprint
          </button>
          <SprintList />
        </div>
        <div className={styles.backlog}>
          <div className={styles.titleSection}>
            <h2>TAREAS EN EL BACKLOG</h2>
            <button className={styles.newTaskBtn} onClick={handleOpenTaskModal}>
              Nueva Tarea
            </button>
          </div>
          <ListTasks onEditTask={(task) => {
            setTareaActiva(task);
            setIsTaskModalOpen(true);
          }} />


          {isTaskModalOpen && <ModalTask handleCloseModal={handleCloseTaskModal} />}
          {isSprintModalOpen && <ModalSprint handleCloseModal={handleCloseSprintModal} />}
        </div>
      </div>
    </div>
  );
};
