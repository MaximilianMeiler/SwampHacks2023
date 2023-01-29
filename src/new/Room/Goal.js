import React from 'react';
import axios from "axios";
import './Goal.css'

const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

const Goal = ({id, room, flag, setFlag, task}) => { 

  async function completeTask() {
    const feedback = document.getElementById('feedback');
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let card
    let random = clamp(Math.random() + (task.value / room.goal * 5), 0, 1)
    console.log(random)
    if (random > .94) {
      card = 5
    } else if (random > .78) {
      card = Math.floor(2*Math.random() + 3)
    } else if (random > .4) {
      card = Math.floor(Math.random()*3)
    } else {
      card = -1
    }
    console.log(card)

  
      axios.put(`http://localhost:3500/rooms/${id}`, {
        id: room.id,
        name: room.name,
        password: room.password,
        users: room.users.map((user) => (
      
          user[0] === localStorage.getItem("name") ? 
            card === -1 ? 
            [user[0], user[1] + task.value*1.2, user[2]] :
            [user[0], user[1] + task.value, user[2].concat([card])]
          : user
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
      feedback.classList.remove('hidden');
      await delay(1500);
      feedback.classList.add('hidden');
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