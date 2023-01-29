import React from 'react'
import './TaskForm.css'

const TaskForm = ({tasks, setTasks}) => {
  
  // const addTask = () => {
  //   const a = document.getElementById("nameBox").value;
  //   const b = document.getElementById("weightBox").value;
  //   if (a === "" || b === "") {
  //     alert("Missing Task Name and Task points")
  //   }
  // }

  return (
    <div className="form">
      <input className='formInput' type="text" id="nameBox" placeholder='Task name'/>
      <input className='formInput' type="number" id="weightBox" placeholder='Task points'/>
      <textarea className='formInput' type="text" id="descBox" placeholder='Task description'/>
      <div className='radio'>
        <input type="checkbox" id="redoCheck"/>
        <label for="redoCheck">Repeatable?</label>
      </div>
      <button className='addTaskButton' onClick={()=> setTasks([...tasks, {
        id: tasks.length + 1,
        title: document.getElementById("nameBox").value,
        description: document.getElementById("descBox").value,
        value: parseInt(document.getElementById("weightBox").value),
        achieved: [],
        redo: document.getElementById("redoCheck").checked
      }])}>
        Add task
      </button>
    </div>
  )
}

export default TaskForm