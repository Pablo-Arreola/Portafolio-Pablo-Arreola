// App.tsx
import { Routes, Route } from "react-router-dom";
import Layout from './layout/Layout';
import Homepage from './pages/Homepage';
import TaskPage from './pages/TasksPage';
import Glosario from './components/glosario';
import Tarea2 from './components/tarea2';

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Homepage />} />   {/* "/" */}
        <Route path="tareas" element={<TaskPage />} />
        <Route path="glosario" element={<Glosario />} />
        <Route path="tarea2" element={<Tarea2 />} />
        <Route path="*" element={<div className="p-6">No encontrado</div>} />
      </Route>
    </Routes>
  );
}
export default App;
