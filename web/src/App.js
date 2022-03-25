import './App.css';
import { Route, Routes } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Homepage from './scenes/Homepage';
import Search from './components/Search';
import Submit from './components/Submit';

function App() {
  return (
    <AnimatePresence exitBeforeEnter initial={false}>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/submit' element={<Submit/>} />
      </Routes>
    </AnimatePresence>
  );
}

export default App;
