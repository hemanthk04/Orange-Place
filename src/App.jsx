import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
// import Bakery from './pages/Bakery';
// import MemoryCards from './pages/MemoryCards';
import MemoryGame from "./pages/MemoryGame";
import Bakery from "./pages/Bakery"
import FaceBuilder from "./pages/FaceBuilder";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/memorycards" element={<MemoryGame />} />
        <Route path="/bakery" element={<Bakery />} />
        <Route path="/facebuilder" element={<FaceBuilder />} />
        {/*  />
        
         */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
