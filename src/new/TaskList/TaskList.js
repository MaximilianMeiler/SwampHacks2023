import React from 'react'
import Task from '../Task/Task.js';
import './TaskList.css'

const taskList = ({tasks, handleDelete}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.id} task={task} handleDelete={handleDelete}/>
      ))}
    </ul>
  )
}

export default taskList