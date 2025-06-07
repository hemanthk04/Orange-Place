import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Bakery from './pages/Bakery';
// import MemoryCards from './pages/MemoryCards';
// import FaceBuilder from './pages/FaceBuilder';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/bakery" element={<Bakery />} />
        <Route path="/memory" element={<MemoryCards />} />
        <Route path="/face" element={<FaceBuilder />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
