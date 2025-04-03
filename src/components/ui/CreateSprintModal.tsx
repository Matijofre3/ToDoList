import { useState } from 'react';
import { useSprintStore } from '../../store/sprintStore';
import Button from './Button';
import Input from './Input';

interface CreateSprintModalProps {
  onClose: () => void;
}

const CreateSprintModal = ({ onClose }: CreateSprintModalProps) => {
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: ''
  });
  const { addSprint } = useSprintStore();

  const handleSubmit = async () => {
    try {
      await addSprint({
        name: formData.name,
        startDate: formData.startDate,
        endDate: formData.endDate
      });
      onClose();
    } catch (error) {
      console.error('Error creating sprint:', error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Crear Nuevo Sprint</h2>
        <Input
          label="Nombre"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <Input
          type="date"
          label="Fecha Inicio"
          value={formData.startDate}
          onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
        />
        <Input
          type="date"
          label="Fecha Límite"
          value={formData.endDate}
          onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
        />
        <div className="modal-actions">
          <Button variant="secondary" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>Crear</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateSprintModal;