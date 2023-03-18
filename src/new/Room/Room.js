import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Goal from "./Goal";
import './room.css';
import './Goal.css'
import Card from "../Cards/Card"

const Room = () => {
  const {id} = useParams();
  const [flag, setFlag] = useState(0);
  const [room, setRoom] = useState(null)
  //const [cards,setCards] = useState([]); 
  const colorArray = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6', 
  '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
  '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A', 
  '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
  '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC', 
  '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
  '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680', 
  '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
  '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3', 
  '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF']; 

  useEffect(() => {
    axios.get(`http://localhost:3500/rooms/${id}`)
    .then((res) => {
      setRoom(res.data)
    })
  }, [flag,id]);
  if (room) {

  console.log(room.users.sort(sortUsernames))
  }
  
function sortUsers(a, b) {
  if (a[1] > b[1]) {
    return -1;
  } else {
    return 1;
  }
}

function sortUsernames(a, b) {
  if (a[0] > b[0]) {
    return -1
  } else {
    return 1
  }
}

  const focus = async (fId) => {
    if(fId !== null || fId !== "") {
      const char = document.getElementById(fId);
      char.classList.add('focused');
      const tr = document.getElementById("tr" + fId);
      tr.classList.add('focused');
    }
  }
  const defocus = async (fId) => {
    if(fId !== null || fId !== "") {
      const char = document.getElementById(fId);
      char.classList.remove('focused');
      const tr = document.getElementById("tr" + fId);
      tr.classList.remove('focused');
    }
  }


  let navigate = useNavigate();

  return (
    
    (room === null) ? 
      <div>
        <img className="mountainImg" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.suwalls.com%2Fwallpapers%2Fnature%2Fsnow-on-mountain-peaks-36874-1920x1200.jpg&f=1&nofb=1&ipt=29b1193425bb1e2633b43c4af8a7e8c0c70d1a2cc8dc4e563a113cb3f0b06ef9&ipo=images" alt="" />
        Room loading...</div> :

    (localStorage.getItem("name").length < 1 || room.users.findIndex((user) => user[0] === localStorage.getItem("name")) < 0) ? 
        navigate("/") :

    
    <div className="room">
      <img className="mountainImg" src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn.suwalls.com%2Fwallpapers%2Fnature%2Fsnow-on-mountain-peaks-36874-1920x1200.jpg&f=1&nofb=1&ipt=29b1193425bb1e2633b43c4af8a7e8c0c70d1a2cc8dc4e563a113cb3f0b06ef9&ipo=images" alt="" />

      <div id="feedback" className="feedback hidden">
        <div>Task Completed!</div>
      </div>
      <p className='codeNotif'>Join Code: {id}</p>
      <p>&nbsp;</p>
    <p className="winNotif">Points need to win: {room.goal}</p>
      <p className='winners'>
        {room.users.filter((u) => u[1] >= room.goal).length > 0 ? "Winners:  " : ""}
        {room.users.filter((u) => u[1] >= room.goal).map((u) => u[0]).join(', ')}
      </p>
      <div className='leaderboard'>
        <div className="mountain">
          <div className="mountainContainer">
            {
              room.users.sort(sortUsers).map((u) => (
                <div onMouseOver={() => focus(room.users.indexOf(u))} onMouseLeave={() => defocus(room.users.indexOf(u))} 
                id={room.users.indexOf(u)} className="char" style={(u[0].charCodeAt() % 2) ? 
                  {top: (270 * (1 - u[1] / room.goal) < 0 ? 0 : 270 * (1 - u[1] / room.goal)) + 'px', 
                  left:270 * u[1] / room.goal > 270 ? 250 : 270 * u[1] / room.goal -20+'px', 
                  backgroundColor: colorArray[u[0].charCodeAt() % 50], opacity:0.85, animationDuration:1+'s'} 
                  : {top: (270 * (1 - u[1] / room.goal) < 0 ? 0 : 270 * (1 - u[1] / room.goal)) + 'px',
                  left: 270 * u[1] / room.goal > 270 ? 250 : 520 - (270 * u[1] / room.goal)+'px', 
                  backgroundColor: colorArray[u[0].charCodeAt() % 50], opacity:0.85, animationDuration:1+'s'
                }}>
                  <div>
                  {room.users.indexOf(u) + 1}
                  </div>
                </div>
              ))
            }
          </div>
          <img src="/images/favicon.svg" alt="" />
        </div>
        <table className="roomTable">
        <tr className="tableHeader">
          <th>#</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
        {room.users.sort(sortUsers).map((user) => (
          <tr id={"tr" + room.users.indexOf(user)} className={parseInt(user[1]) >= parseInt(room.goal) ? "winner" : ""} 
          style={{color: colorArray[user[0].charCodeAt() % 50]}}>
            <td onMouseOver={() => focus(room.users.indexOf(user))} onMouseLeave={() => defocus(room.users.indexOf(user))}>{room.users.indexOf(user) + 1}</td>
            <td onMouseOver={() => focus(room.users.indexOf(user))} onMouseLeave={() => defocus(room.users.indexOf(user))}>{user[0]}</td>
            <td onMouseOver={() => focus(room.users.indexOf(user))} onMouseLeave={() => defocus(room.users.indexOf(user))}>{user[1]}</td>
          </tr>
        ))}
      </table>
    </div>
    <ul className='cardList'>
        {room.users.find((u) => u[0] === localStorage.getItem("name"))[2].map((card) => (
          <Card index={card} room={room} flag={flag} setFlag={setFlag}/>
        ))}
    </ul>
    <ul className="taskList">
      {room.tasks.map((task) => (
        task.achieved.indexOf(localStorage.getItem("name")) === -1 ? 
        <Goal id={id} room={room} flag={flag} setFlag={setFlag} task={task}/> : 
        <p className="taskComplete">Task achieved!</p>
        ))}
    </ul>
  </div>
  )
}

export default Room;