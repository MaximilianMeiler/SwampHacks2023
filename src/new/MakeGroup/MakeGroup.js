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
      <input type="text" id="groupName" placeholder='Group Name'/>
      <Link className="buttonLike" to={target} onClick={() => publishGroup()}>
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