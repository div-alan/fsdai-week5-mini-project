import { Routes, Route } from "react-router-dom";
import Taskboard from "./components/Taskboard.jsx"
import TaskDetail from "./components/TaskDetail.jsx"
import Stats from "./components/Stats.jsx"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Taskboard />} />
      <Route path="/tasks/:id" element={<TaskDetail />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default App;