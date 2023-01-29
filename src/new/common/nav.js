import React from 'react';
import './nav.css';

const Nav = () => {
  return (
    <nav>
      <ul className="navList">
        <li className="navItem"><a className="navLink" href="/"><img src="" alt="" />Climbr</a></li>
        <li className="navItem"><a className="navLink" href="/create">Create Group</a></li>
      </ul>
    </nav>
  )
}

export default Nav