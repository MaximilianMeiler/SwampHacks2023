import React from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Goal from "./Goal";
import './Room.css';
import './Goal.css'
import Card from "../Cards/Card"



const Room = () => {
  const {id} = useParams();
  const [flag, setFlag] = useState(0);
  const [room, setRoom] = useState(null) 

  useEffect(() => {
    axios.get(`http://localhost:3500/rooms/${id}`)
    .then((res) => {
      setRoom(res.data)
    })
  }, [flag]);
  console.log(room)
  
function sortUsers(a, b) {
  if (a[1] > b[1]) {
    return -1;
  } else {
    return 1;
  }
}


function useCard(index) {
  
}

let navigate = useNavigate();

  return (
    
    (room === null) ? 
      <div>Group loading...</div> :

    (localStorage.getItem("name").length < 1 || room.users.findIndex((user) => user[0] === localStorage.getItem("name")) < 0) ? 
        navigate("/") :

    <div className="room">
      <p>Points need to win: {room.goal}</p>
      <p className='winners'>
        {room.users.filter((u) => u[1] >= room.goal).length > 0 ? "Winners:  " : ""}
        {room.users.filter((u) => u[1] >= room.goal).map((u) => u[0]).join(', ')}
      </p>

      <table className="leaderboard">
        <tr className="tableHeader">
          <th>#</th>
          <th>Name</th>
          <th>Points</th>
        </tr>
        {room.users.sort(sortUsers).map((user) => (
          <tr>
            <td className={parseInt(user[1]) >= parseInt(room.goal) ? "winner" : ""}>{room.users.indexOf(user) + 1}</td>
            <td className={parseInt(user[1]) >= parseInt(room.goal) ? "winner" : ""}>{user[0]}</td>
            <td className={parseInt(user[1]) >= parseInt(room.goal) ? "winner" : ""}>{user[1]}</td>
          </tr>
        ))}
      </table>
      <ul className="taskList">
        {room.tasks.map((task) => (
          task.achieved.indexOf(localStorage.getItem("name")) === -1 ? 
            <Goal id={id} room={room} flag={flag} setFlag={setFlag} task={task}/> : 
            <p className="taskComplete">Task achieved!</p>
        ))}
      </ul>
      <ul>
        {room.users.find((u) => u[0] === localStorage.getItem("name"))[2].map((card) => (
          <Card index={card} room={room} flag={flag} setFlag={setFlag}/>
        ))}
      </ul>
    </div>
  )
}

export default Room;