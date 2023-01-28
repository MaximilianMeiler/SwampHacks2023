import './App.css';
import Container from './new/Container';
import Room from "./new/Room"
import {useEffect, useState} from "react";
import {Route, Routes} from "react-router-dom"

function App() {
  
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Container/>}/>
        <Route path="/:id" element={<Room/>}/>
      </Routes>
    </div>
  );
}

export default App;
