import React from 'react'
import {FaTrashAlt} from 'react-icons/fa';
import './Task.css';

const Task = ({task, handleCheck, handleDelete}) => {
  return (
    <li class="taskContainer">
        
        <div class="taskInfo">
            <FaTrashAlt
                class="trash"
                onClick={() => handleDelete(task.id)}
                role = "button"
                tabIndex="0"
            />
            <label id="title">
                {task.title}
            </label>
            <p id="points">
                Points: {task.value}
            </p>
            <p id="description">
                {task.description}
            </p>
        </div>
    </li>
  )
}

export default Task