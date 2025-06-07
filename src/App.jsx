import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Bakery from './pages/Bakery';
// import MemoryCards from './pages/MemoryCards';
import MemoryGame from "./pages/MemoryGame";
// import FaceBuilder from './pages/FaceBuilder';

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memory" element={<MemoryGame />} />
        {/* <Route path="/bakery" element={<Bakery />} />
        
        <Route path="/face" element={<FaceBuilder />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
