import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";

const client = axios.create({
  baseURL: "http://localhost:3500/rooms" 
});

const Welcome = () => {
  const [name, setName] = useState(localStorage.getItem("name"));
  return (
  <>
  <p>Welcome to our Climbr!</p>
  <input type="text" id="nameBox" placeholder='Type your name!'/>
  <button onClick={() => {
    localStorage.setItem("name", document.getElementById("nameBox").value);
    setName(localStorage.getItem("name"));
  }}>Submit Name</button>
  </>
  )

}

export default Welcome