import './App.css';
import Home from './new/Home/Home';
import Room from "./new/Room/Room.js";
import MakeGroup from './new/MakeGroup/MakeGroup.js';
import Nav from './new/common/nav';
import {Route, Routes} from "react-router-dom"
import Analysis from './new/Analysis/Analysis';

function App() {

  return (
    <div className="App">
      <Nav/>
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home/>}/>
          <Route exact path="/create" element={<MakeGroup currentSize={1}/>}/>
          <Route exact path="/analysis" element={<Analysis/>}/>
          <Route path="/:id" element={<Room/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
