import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Groups from "./Pages/Groups";
import AddGroup from "./Pages/AddGroup";
import JoinGroup from "./Pages/JoinGroup";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/group/:id" element={<Groups />} />
        <Route path="/add-group" element={<AddGroup />} />
        <Route path="/join-group" element={<JoinGroup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
