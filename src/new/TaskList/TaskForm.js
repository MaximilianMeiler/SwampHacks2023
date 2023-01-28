import React from 'react'


const TaskForm = ({tasks, setTasks}) => {
  
  return (
    <div>
        <input type="text" id="nameBox" placeholder='Task name'/>
        <input type="text" id="descBox" placeholder='Task description'/>
        <input type="text" id="weightBox" placeholder='Task weighting'/>
        <button onClick={()=> setTasks([...tasks, {
          title: document.getElementById("nameBox").value,
          description: document.getElementById("descBox").value,
          value: document.getElementById("weightBox").value,
          achieved: []
        }])}>
          Add task
        </button>
    </div>
  )
}

export default TaskForm