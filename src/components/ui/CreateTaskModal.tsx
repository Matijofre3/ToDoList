import { useState } from 'react';

import Button from './Button';
import Input from './Input';
import { useTaskStore } from '../../store/taskStore';
import { Task, TaskStatus } from '../../types/types';

interface CreateTaskModalProps {
  onClose: () => void;
}

const CreateTaskModal = ({ onClose }: CreateTaskModalProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pendiente' as TaskStatus
  });
  const { addTask } = useTaskStore();

  const handleSubmit = () => {
    addTask({
        ...formData,
      } as Omit<Task, 'id'>);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Crear Nueva Tarea</h2>
        <Input
          label="Título"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <Input
          label="Descripción"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          as="textarea"
        />
        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose}>Cancelar</Button>
          <Button onClick={handleSubmit}>Crear</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateTaskModal;