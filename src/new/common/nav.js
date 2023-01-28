import React from 'react';
import {useState} from 'react';
import './nav.css';

const Nav = () => {
  return (
    <nav>
      <ul class="navList">
        <li class="navItem"><a class="navLink" href=".">Analysis</a></li>
        <li class="navItem"><a class="navLink" href="/">Home</a></li>
        <li class="navItem"><a class="navLink" href="/create">Create Group</a></li>
      </ul>
    </nav>
  )
}

export default Nav