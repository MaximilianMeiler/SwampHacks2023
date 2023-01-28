import React from 'react';
import './nav.css';

const Nav = () => {
  return (
    <nav>
      <ul className="navList">
        <li className="navItem"><a className="navLink" href=".">Analysis</a></li>
        <li className="navItem"><a className="navLink" href="/">Home</a></li>
        <li className="navItem"><a className="navLink" href="/create">Create Group</a></li>
      </ul>
    </nav>
  )
}

export default Nav