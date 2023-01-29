import React, { useEffect } from 'react';
import './nav.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Nav = () => {
  const [name, setName] = useState(localStorage.getItem("name") === null ? "" : localStorage.getItem("name"));

  let navigate = useNavigate();

  return (
    <nav>
      <ul className="navList">
        <li className="navItem"><a className="navLink" href="/"><img className='navImg' src="/images/favicon.svg" alt="" />Climbr</a></li>
        <li className="navItem"><a className="navLink" href="/analysis">Analytics</a></li>
        <li className="navItem"><a className="navLink" href="/create">Create Group</a></li>
        <li className='navItem b' href="/" onClick={() => {
        localStorage.setItem("name","");
        navigate(0);
        }}><div id="navName" className="navLink" style={{paddingBottom: "0px"}}>{name}</div><div id="navName" class="navLink" style={{paddingTop: "0px"}}>(Log out)</div></li>
      </ul>
    </nav>
  )
}

export default Nav