import React from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import './room.css';
import { useEffect, useState } from 'react';
import Goal from "./Goal";


const Room = () => {
  const {id} = useParams();

  const client = axios.create({
    baseURL: `http://localhost:3500/rooms/${id}`
  });

  const [rooms, setRooms] = useState([]);
  const [flag, setFlag] = useState(0);
  const [room, setRoom] = useState({})
  
  useEffect(() => {
    client.get()
    .then((res) => {
      setRoom(res.data);
    })
  }, [flag]);


  return (
    <body>
      <Link to="/">{id}</Link>
      <ul>
        {room.users.map((user) => (
          <p>{user[0]} has {user[1]} points</p>
        ))}
      </ul>
      <ul>
        {room.tasks.map((task) => (
          <Goal task={task}/>
        ))}
      </ul>
    </body>
  )
}

export default Room;