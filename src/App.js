import { Routes, Route, BrowserRouter } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>home</div>} />
        <Route path="about" element={<div>about</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
