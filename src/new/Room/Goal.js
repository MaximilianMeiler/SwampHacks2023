import React from 'react';
import axios from "axios";

const Goal = ({id, room, flag, setFlag, task}) => {

  function completeTask() {
    axios.put(`http://localhost:3500/rooms/${id}`, {
      id: room.id,
      name: room.name,
      password: room.password,
      users: room.users.map((user) => (
        user[0] === localStorage.getItem("name") ? [user[0], user[1] + task.value] : user
      )),
      tasks: room.tasks.map((t) => (
        task.title === t.title ? {
          title: t.title,
          description: t.description,
          value: t.value,
          achieved: t.achieved.concat([localStorage.getItem("name")])
        } : {
          title: t.title,
          description: t.description,
          value: t.value,
          achieved: t.achieved
        }
      ))
    })
    .then((res) => {
      setFlag(flag + 1);
    })
  }


  return (
    <div>
      <p></p>
      <div>{task.title}</div>
      <div>Points: {task.value}</div>
      <div>{task.description}</div>
      <button onClick={() => completeTask()}></button>
    </div>
  )
}

export default Goal;