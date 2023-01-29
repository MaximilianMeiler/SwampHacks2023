import React, { useEffect } from 'react';
import './nav.css';
import { useState } from 'react';

const Nav = () => {
  const [name, setName] = useState(localStorage.getItem("name") === null ? "" : localStorage.getItem("name"));

  return (
    <nav>
      <ul className="navList">
        <li className="navItem"><a className="navLink" href="/"><img className='navImg' src="/images/favicon.svg" alt="" />Climbr</a></li>
        <li className='navItem b'><div id="navName" className="navLink">{name}</div></li>
        <li className="navItem"><a className="navLink" href="/create">Create Group</a></li>
      </ul>
    </nav>
  )
}

export default Nav