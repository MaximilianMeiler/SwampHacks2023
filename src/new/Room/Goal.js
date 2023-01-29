import React from 'react';
import axios from "axios";
import './Goal.css'

const Goal = ({id, room, flag, setFlag, task}) => { 

  function completeTask() {
    axios.put(`http://localhost:3500/rooms/${id}`, {
      id: room.id,
      name: room.name,
      password: room.password,
      users: room.users.map((user) => (
        user[0] === localStorage.getItem("name") ? [user[0], user[1] + task.value] : user
      )),
      goal: room.goal,
      tasks: room.tasks.map((t) => (
        task.title === t.title && task.redo === false ? {
          title: t.title,
          description: t.description,
          value: t.value,
          achieved: t.achieved.concat([localStorage.getItem("name")]),
          redo: t.redo
        } : {
          title: t.title,
          description: t.description,
          value: t.value,
          achieved: t.achieved,
          redo: t.redo
        }
      ))
    })
    .then((res) => {
      setFlag(flag + 1);
    })
  }


  return (
    <div className="goalContainer">
      <div className="goalName">{task.title}</div>
      <p>Points: {task.value}</p>
      <p>{task.description}</p>
      <button onClick={() => completeTask()}>Done</button>
    </div>
  )
}

export default Goal;