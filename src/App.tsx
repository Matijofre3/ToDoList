
import { useTasksLoader } from './hooks/useApi';
import { AppRoutes } from './routes/AppRoutes';

function App() {
  useTasksLoader();
  
  return (
    <div className="app-container">
      <AppRoutes />
    </div>
  );
}

export default App;