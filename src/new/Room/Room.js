import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './Room.css';
import { useEffect, useState } from 'react';
import Goal from "./Goal";


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
  

  return (
    (room === null) ? 
      <div>Room not found</div> :
    <div className="room">
      <table className="leaderboard">
        <tr>
          <th>Name</th>
          <th>Points</th>
        </tr>
        {room.users.map((user) => (
          <tr>
            <td>{user[0]}</td>
            <td>{user[1]}</td>
          </tr>
          /* <li>{user[0]} has {user[1]} points</li> */
        ))}
      </table>
      <ul>
        {room.tasks.map((task) => (
          <Goal id={id} room={room} flag={flag} setFlag={setFlag} task={task}/>
        ))}
      </ul>
    </div>
  )
}

export default Room;