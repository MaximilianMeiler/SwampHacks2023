import React, { useEffect, useState } from 'react';
import axios from 'axios';
//import { useNavigate, useParams } from 'react-router-dom';
import "./Analysis.css";

const Analysis = () => {
  const [flag] = useState(0);
  const [rooms, setRooms] = useState([]);
  useEffect(() => {
    axios.get(`http://localhost:3500/rooms/`)
    .then((res) => {
      setRooms(res.data)
    })
  }, [flag]);

  return(
    <div>
      <h2 className='anTitle'>Analytics</h2>
      <table className="anTable" style={{width: 100+'%'}}>
        <tr>
          <th>Group Name</th>
          <th>Group Code</th>
          <th># ppl</th>
          <th>Points Goal</th>
          <th>Avg. Points</th>
          <th>Users</th>
          <th>Winners</th>
        </tr>
        {
          rooms.map((r) => (
            <tr>
              <td>{r.name}</td>
              <td>{r.id}</td>
              <td>{r.users.length}</td>
              <td>{r.goal}</td>
              <td>
                <div className="pie-chartone" style={{
                  background:
                  `conic-gradient(#7F8C72 0%, #00F071 ${parseInt(r.users.map((u) => u[1]).reduce((acc, n) => acc + n, 0)/r.users.length / r.goal * 100)}%, #87648C 0%)`
                }}> 
                  {Math.floor(r.users.map((u) => u[1]).reduce((acc, n) => acc + n, 0)/r.users.length)}
                </div>
              </td>
              <td>{r.users.map((u) => u[0]).join(', ')}</td>
              <td>{r.users.filter((u) => u[1] > r.goal).map((u) => u[0]).join(', ')}</td>
            </tr>
          ))
        }
      </table>
    </div>
  )
}

export default Analysis