import React from 'react';
import {useState} from 'react';
import {FaTrashAlt} from 'react-icons/fa';
import TaskList from '../TaskList/TaskList.js';
import TaskForm from '../TaskList/TaskForm.js';
import axios from "axios";
import {Link} from "react-router-dom";
import './MakeGroup.css';

const client = axios.create({
  baseURL: "http://localhost:3500/rooms" 
});

const MakeGroup = ({currentSize}) => {
  const [tasks,setTasks] = useState([]);
  //const [flag, setFlag] = useState(0);
  
  const handleDelete = (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);
    localStorage.setTasks("tasksList", JSON.stringify(listTasks));
  }


  const publishGroup = () => {
    const newGroup = {
        id: currentSize + 1,
        name : document.getElementById("groupName").value,
        users: [[localStorage.getItem("name"),0]],
        tasks: tasks
    }
    client.post("", newGroup)
    .then((res) => {})
  }

  const target = `/${currentSize+1}`

  return (
    <div>
        <TaskList
          tasks={tasks}
          handleDelete={handleDelete} 
        />
        <TaskForm tasks={tasks} setTasks={setTasks}/>
        <input type="text" id="groupName" placeholder='Group Name'/>
        <Link class="publish" to={target} onClick={() => publishGroup()}>
          Publish
        </Link>
    </div>
  ) 
}

export default MakeGroup;