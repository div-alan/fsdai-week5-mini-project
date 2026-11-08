import { Routes, Route } from "react-router-dom";
import Taskboard from "./components/Taskboard.jsx"
import TaskDescription from "./components/TaskDescription.jsx"
import Stats from "./components/Stats.jsx"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Taskboard />} />
      <Route path="/tasks/:id" element={<TaskDescription />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  );
}

export default App;