import './App.css';
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Homepage from './scenes/Homepage';
import Search from './scenes/Search';
import Submit from './scenes/Submit';

function App() {
  return (
    <AnimatePresence>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/submit' element={<Submit/>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
