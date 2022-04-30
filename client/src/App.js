import { Routes, Route, BrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
