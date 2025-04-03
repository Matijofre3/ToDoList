import { Routes, Route } from 'react-router-dom';
import BacklogScreen from '../components/screens/BacklogScreen';
import SprintScreen from '../components/screens/SprintScreen';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<BacklogScreen />} />
    <Route path="/sprints" element={<SprintScreen />} />
  </Routes>
);