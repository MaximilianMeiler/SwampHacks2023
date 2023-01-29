import React from 'react';
import {useState} from 'react';
import TaskList from '../TaskList/TaskList.js';
import TaskForm from '../TaskForm/TaskForm.js';
import axios from "axios";
import {Link} from "react-router-dom";
import './MakeGroup.css';

const client = axios.create({
  baseURL: "http://localhost:3500/rooms" 
});

const MakeGroup = ({currentSize}) => {
  const [tasks, setTasks] = useState([]);
  //const [flag, setFlag] = useState(0);
  
  const handleDelete = (id) => {
    const listTasks = tasks.filter((task) => task.id !== id);
    setTasks(listTasks);
    // setTasks("tasksList", JSON.stringify(listTasks));
  }

  const i = (Math.random() + 1).toString(36).substring(5);
  const publishGroup = () => {
    const newGroup = {
        id: i,
        name : document.getElementById("groupName").value,
        users: [[localStorage.getItem("name"),0,[]]],
        tasks: tasks,
        goal: document.getElementById("goalBox").value
    }
    client.post("", newGroup)
    .then((res) => {})
  }


  return (
    <div>
      <h2 class="createText">Create a Group</h2>
      <input type="text" id="groupName" placeholder='Group Name'/>
      <input type="number" id="goalBox" placeholder='Point goal'/>
      <Link className="buttonLike" to={"/"} onClick={() => publishGroup()}>
        Publish
      </Link>
      <TaskForm tasks={tasks} setTasks={setTasks}/>
      <TaskList
        tasks={tasks}
        handleDelete={handleDelete} 
      />
    </div>
  ) 
}

export default MakeGroup;