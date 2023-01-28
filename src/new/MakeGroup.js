import React from 'react';
import {useState} from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import TaskList from './TaskList/TaskList.js';
import TaskForm from './TaskList/TaskForm.js'

const MakeGroup = () => {
  const [tasks,setTasks] = useState([]);
  
  const handleCheck = (id) => {
    const listTasks = tasks.map((task) => task.id === id ? { ...task,
    checked: !task.checked} : task);
    setTasks(listTasks);<TaskForm/>
    localStorage.setTasks("tasksList", JSON.stringify(listTasks));
  }
  
  const handleDelete = (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);
    localStorage.setTasks("tasksList", JSON.stringify(listTasks));
  }

  return (
    <div>
        <TaskList
          tasks={tasks}
          handleCheck={handleCheck}
          handleDelete={handleDelete} 
        />
        <TaskForm tasks={tasks} setTasks={setTasks}/>

    </div>
  )
}

export default MakeGroup