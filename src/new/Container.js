import React from 'react'
import axios from "axios";
import {useEffect, useState} from "react";

const client = axios.create({
  baseURL: "http://localhost:3500/rooms" 
});

const Container = () => {
  const [name, setName] = useState(localStorage.getItem("name"));
  const [rooms, setRooms] = useState([]);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    client.get()
    .then((res) => {
      setRooms(res.data);
    })
  }, [flag]); //no dependency here allows commenting of request result actions
     //add time-polling solution here

  function createRoom(name, pass) {
    client.post("", {
      id: rooms.length === 0 ? 0 : rooms[rooms.length-1].id + 1,
      name: name,
      password: pass,
      users: [localStorage.getItem("name")] //MAKE THIS MORE SECURE
    })
    .then((res) => {
      //setRooms([...rooms, res.data]);
      setFlag(flag + 1);
    })  
  }

  function updateRoomUser(paramId, user) {
    const room = rooms.find(room => room.id === paramId);
    const userIndex = room.users.indexOf(user);
    client.put(`/${paramId}`, {
      id: paramId,
      name: room.name,
      password: room.password,
      users: userIndex === -1 ? room.users.concat([user]) : room.users.filter((u) => u !== user)
    })
    .then((res) => {
      //const myRoom = rooms.findIndex(room => room.id === paramId)
      setFlag(flag + 1);
    })
  }

  function deleteRoom(name, pass) {
    const room = rooms.find(room => room.name === name && room.password === pass && room.users[0] === localStorage.getItem("name"))
    client.delete(`/${room.id}`)
    .then(() => {
      //setRooms(null);
      setFlag(flag + 1);
    })
  }


  return (
    <div>
      
      <p>Hello, {name}</p>
      <input type="text" id="nameBox"/>
      <button onClick={() => {
        localStorage.setItem("name", document.getElementById("nameBox").value);
        setName(localStorage.getItem("name"));
      }}>Submit Name</button>

      <p>Your rooms:</p>
      <ul>
        {rooms.map((room) => (
          room.users.indexOf(localStorage.getItem("name")) >= 0 ?
          <>
            <h1 style={{display: 'inline'}}>{room.name}</h1>
            <button style={{display: 'inline', marginLeft: "100px"}}
              onClick={() => {
                updateRoomUser(room.id, localStorage.getItem("name"));
                }
              }
            >Leave room</button>
          </>
          : <></>
        ))}
      </ul>
      {
        (rooms.length === 0) ? <p>No rooms!</p> : <></>
      }
      <p>Other rooms:</p>
      <ul>
        {rooms.map((room) => (
          room.users.indexOf(localStorage.getItem("name")) < 0 ?
          <>
            <h1 style={{display: 'inline'}}>{room.name}</h1>
            <button style={{display: 'inline', marginLeft: "100px"}}
              onClick={() => {
                updateRoomUser(room.id, localStorage.getItem("name"));
                }
              }
            >Join room</button>
            <p></p>
          </>
          : <></>
        ))}
      </ul>
      <input type="text" id="roomBox" placeholder='Room name'/>
      <input type="text" id="passBox" placeholder='Room password'/>
      <button onClick={() => createRoom(document.getElementById("roomBox").value, document.getElementById("passBox").value)}>Create room</button>
      <button onClick={() => deleteRoom(document.getElementById("roomBox").value, document.getElementById("passBox").value)}>Delete Room</button>
    </div>
  )
}

export default Container