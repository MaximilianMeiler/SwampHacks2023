import React from 'react'
import './TaskForm.css'

const TaskForm = ({tasks, setTasks}) => {
  
  const addTask = () => {
    const id = tasks.length + 1;
    const title = document.getElementById("nameBox").value;
    const desc = document.getElementById("descBox").value;
    const value = document.getElementById("weightBox").value;
    const redo = document.getElementById("redoCheck").checked;
    if(id === "" || title === "" || value === "") {
      alert("Missing fields.")
      return;
    }
    return setTasks([...tasks, {
    id: id,
    title: title,
    description: desc,
    value: parseInt(value),
    achieved: [],
    redo: redo
  }])}

  return (
    <div className="form">
      <input className='formInput' type="text" id="nameBox" placeholder='Task name'/>
      <input className='formInput' type="number" id="weightBox" placeholder='Task points'/>
      <textarea className='formInput' type="text" id="descBox" placeholder='Task description'/>
      <div className='radio'>
        <input type="checkbox" id="redoCheck" className='redoCheck'/>
        <label for="redoCheck" className='redoText'>Repeatable?</label>
      </div>
      <button className='addTaskButton' onClick={addTask}>
        Add task
      </button>
    </div>
  )
}

export default TaskForm