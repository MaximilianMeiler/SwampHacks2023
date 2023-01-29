import React from 'react'
import {FaTrashAlt} from 'react-icons/fa';
import './Task.css';

const Task = ({task, handleDelete}) => {   
    return (
    <li className="taskContainer">
        <FaTrashAlt
            className="trash"
            onClick={() => handleDelete(task.id)}
            role = "button"
            tabIndex="0"
        />
        <p id="title">
            {task.title}
        </p>
        <p id="points">
            Points: {task.value}{task.redo?" / (Repeat)":""}
        </p>
        <p id="description">
            {task.description}
        </p>
    </li>
  )
}

export default Task