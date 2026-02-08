import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/projects";
import CreateProject from "./pages/Createproject";
import UploadDocument from "./pages/UploadDocument";
import AssignDevelopers from "./pages/AssignDevelopers";
import ProjectDetails from "./pages/ProjectDetails";
import Register from "./pages/Register";
import Home from "./pages/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/create-project" element={<CreateProject />} />
        <Route path="/upload" element={<UploadDocument />} />
        <Route path="/assign" element={<AssignDevelopers/>}/>
        <Route path="/projects/:id" element={<ProjectDetails/>}/>
        <Route path="/register" element={<Register/>}/>


      </Routes>
    </BrowserRouter>
  );
}

export default App;
