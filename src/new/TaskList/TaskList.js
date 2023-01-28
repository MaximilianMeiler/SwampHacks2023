import React from 'react'
import './TaskList.css'
import Task from '../Task/Task.js';

const taskList = ({tasks, handleDelete}) => {
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.key} task={task} handleDelete={handleDelete}/>
      ))}
    </ul>
  )
}

export default taskList