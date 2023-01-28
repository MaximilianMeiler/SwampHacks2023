import './App.css';
import Home from './new/Home/Home';
import Room from "./new/Room/Room.js";
import MakeGroup from './new/MakeGroup';
import Nav from './new/common/nav';
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom"

function App() {
  
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route exact path="/" element={<Home/>}/>
        <Route exact path="/create" element={<MakeGroup/>}/>
        <Route path="/:id" element={<Room/>}/>
      </Routes>
    </div>
  );
}

export default App;
