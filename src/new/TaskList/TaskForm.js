import React from 'react'


const TaskForm = ({tasks, setTasks}) => {
  
  return (
    <div className="form">
        <input className='formInput' type="text" id="nameBox" placeholder='Task name'/>
        <input className='formInput' type="number" id="weightBox" placeholder='Task points'/>
        <textarea className='formInput' type="text" id="descBox" placeholder='Task description'/>
        <button onClick={()=> setTasks([...tasks, {
          //id: tasks.size() + 1,
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