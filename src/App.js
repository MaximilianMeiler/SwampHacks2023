import './App.css';
import Home from './new/Home/Home';
import Room from "./new/Room/Room.js";
import MakeGroup from './new/MakeGroup/MakeGroup.js';
import Nav from './new/common/nav';
import {Route, Routes} from "react-router-dom"
import Analysis from './new/Analysis/Analysis';
import React, { useState, useEffect } from 'react';

const baseUrl = "https://climbrapi.vercel.app";

function App() {
  const [rooms, setRooms] = useState([]);

  const loadRooms = async () => {
    let results = await fetch(`${baseUrl}/rooms`).then(resp => resp.json());
    setRooms(results);
  }

  useEffect(() => {
    loadRooms();
  })

  return (
    <div className="App">
      <Nav/>
      <div className='container'>
        <Routes>
          <Route exact path="/" element={<Home rooms={rooms} baseUrl={baseUrl}/>}/>
          <Route exact path="/create" element={<MakeGroup currentSize={1} baseUrl={baseUrl}/>}/>
          <Route exact path="/analysis" element={<Analysis/>}/>
          <Route path="/:id" element={<Room rooms={rooms} baseUrl={baseUrl}/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
