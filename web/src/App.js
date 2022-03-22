import './App.css';
import { Route, Routes } from "react-router-dom";
import Homepage from './scenes/Homepage';
import Search from './scenes/Homepage';
import Submit from './components/Submit';

function App() {
  return (
    <div className='App' style={{height: '100%'}}>
      <Routes>
        <Route path='/' element={<Homepage/>} />
        <Route path='/search' element={<Search/>} />
        <Route path='/submit' element={<Submit/>} />
      </Routes>
    </div>
  );
}

export default App;
