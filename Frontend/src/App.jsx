import Home from "./pages/Home/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Project from "./pages/Project/Project";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:name" element={<Project />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
