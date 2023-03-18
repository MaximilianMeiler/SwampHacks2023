import React from 'react'
import axios from "axios";
import './Home.css';
import {useEffect, useState} from "react";
import {Link} from "react-router-dom"


const client = axios.create({
  baseURL: "https://climbr-fdd3e-default-rtdb.firebaseio.com/rooms.json"
});

const Home = () => {
  const [name, setName] = useState(localStorage.getItem("name") === null ? "" : localStorage.getItem("name"));
  const [rooms, setRooms] = useState([]);
  const [flag, setFlag] = useState(0);

  useEffect(() => {
    client.get("")
    .then((res) => setRooms(res.data));
  }, [flag]); //no dependency here allows commenting of request result actions
     //add time-polling solution here

  function updateRoomUser(paramId, user) {
    const room = rooms.find(room => room.id === paramId);
    if (room) {
      const userIndex = room.users.findIndex((u) => u[0] === user);
      client.put(`/${paramId}`, {
        id: paramId,
        name: room.name,
        password: room.password,
        users: userIndex === -1 ? room.users.concat([[user, 0, []]]) : room.users.filter((u) => u[0] !== user),
        tasks: room.tasks,
        goal: room.goal
      })
      .then((res) => {
        //const myRoom = rooms.findIndex(room => room.id === paramId)
        setFlag(flag + 1);
      })
    }
  }
  
  return (
    <div>
    <img className="mountainImg" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.suwalls.com%2Fwallpapers%2Fnature%2Fsnow-on-mountain-peaks-36874-1920x1200.jpg&f=1&nofb=1&ipt=29b1193425bb1e2633b43c4af8a7e8c0c70d1a2cc8dc4e563a113cb3f0b06ef9&ipo=images" alt="" />
    { name.length > 0 ? 
      <div className='homeContainer'>
      <h4 className="greeting">Hello, {name}</h4>
      
      <p style={{marginTop: "20px"}}></p>
      <div className="joinText">Join group:</div>
      <div className='join' action="">
        <input id="codeBox" type="text" placeholder='Enter code...'/>
        <button type="submit" onClick={() => updateRoomUser(document.getElementById("codeBox").value, localStorage.getItem("name"))}>Join!</button>
      </div>

      <h4 className="yourText">Your groups:</h4>
      <ul className="roomList">
        {rooms.map((room) => (
          room.users.findIndex((user) => user[0] === localStorage.getItem("name")) >= 0 ?
          <div className="roomItem">
            <div className="roomName">{room.name}</div>
            <div className="roomBottom">
              <div className="pie-chartone" style={{
                  background:
                  `conic-gradient(#7F8C72 0%, #00F071 ${parseInt(room.users.find((u) => u[0] === localStorage.getItem("name"))[1] / room.goal * 100)}%, #87648C 0%)`
              }}>
              {parseInt(room.users.find((u) => u[0] === localStorage.getItem("name"))[1] / room.goal * 100)}%
              </div>
              <div className="numbers">
                <p>Your points: {room.users.find((user) => user[0] === localStorage.getItem("name"))[1]}</p>
                <Link className="buttonLike" to={`/${room.id}`}>Go to group</Link>
                <button 
                  onClick={() => {
                    updateRoomUser(room.id, localStorage.getItem("name"));
                    }
                  }
                >Leave group</button>
              </div>
            </div>
          </div>
          : <></>
            ))}
      </ul>
      {
        (rooms.length === 0) ? <h4>Loading groups...</h4> : <></>
      }
      </div>
  :  <>
  <div className="welcome">Welcome to Climbr!</div>
  <form action="">
    <input type="text" id="nameBox" placeholder='Type your name!'/>
    <button type="submit" onClick={() => {
      localStorage.setItem("name", document.getElementById("nameBox").value);
      setName(localStorage.getItem("name"));
      document.getElementById("navName").innerHTML = localStorage.getItem("name");
    }}>Log In</button>
  </form>
  </>
  }
  </div>
  )
}

export default Home