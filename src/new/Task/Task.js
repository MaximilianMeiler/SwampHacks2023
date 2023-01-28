import React from 'react'
import {FaTrashAlt} from 'react-icons/fa';
import {useEffect, useState} from "react";

const Task = ({task, handleCheck, handleDelete}) => {

  return (
    <div>
        <label
            onDoubleClick={() => handleCheck(task.id)}
        >Task Name: <strong>{task.title}</strong> (Weight = {task.value})</label>
        <div className = "containerP">
            <p className = "descrip">{task.description}</p>
        </div>
        
        <FaTrashAlt
            onClick={() => handleDelete(task.id)}
            role = "button"
            tabIndex="0"
        />
    </div>
  )
}

export default Task