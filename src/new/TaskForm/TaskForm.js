import React from 'react'
import './TaskForm.css'

const TaskForm = ({tasks, setTasks}) => {
  
  return (
    <div className="form">
        <input className='formInput' type="text" id="nameBox" placeholder='Task name'/>
        <input className='formInput' type="number" id="weightBox" placeholder='Task points'/>
        <textarea className='formInput' type="text" id="descBox" placeholder='Task description'/>
        <input type="checkbox" />
        <p>Repeatable?</p>
        <button className='addTaskButton' onClick={()=> setTasks([...tasks, {
          id: tasks.length + 1,
          title: document.getElementById("nameBox").value,
          description: document.getElementById("descBox").value,
          value: parseInt(document.getElementById("weightBox").value),
          achieved: []
        }])}>
          Add task
        </button>
    </div>
  )
}

export default TaskForm