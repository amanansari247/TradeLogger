
import './App.css';

import { Routes, Route } from "react-router-dom";

import TradeLogger from './Components/Todo';
function App() {
  return (
  <div>
   <Routes>
    <Route path='/' element={<TradeLogger/>}/>
   
   </Routes>
    
  </div>
  );
}

export default App;
