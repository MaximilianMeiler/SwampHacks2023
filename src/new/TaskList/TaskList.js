import React from 'react'
import './TaskList.css'
import {FaTrashAlt} from 'react-icons/fa';
import Task from '../Task/Task.js';
import {useEffect, useState} from "react";

const taskList = ({tasks, handleCheck, handleDelete}) => {

  
  return (
    <ul>
      {tasks.map((task) => (
        <Task key={task.key} task={task} handleDelete={handleDelete} handleCheck={handleCheck}/>
      ))}
  </ul>
  )
}

export default taskList