import React from 'react'
import {useState, useEffect} from 'react'
import axios from "axios"
import './Card.css';

function removeVal(arr, val) {
  for (let x=0; x < arr.length; x++) {
    if (arr[x] === val) {
      return arr.slice(0, x).concat(arr.slice(x+1))
    }
  }
  return arr
}

function findNextIndex(arr, u) {
  let max = 999999999;
  let closest = 0;
  for (let x = 0; x < arr.length; x++) {
    if (arr[x][1] < max && arr[x][1] > u[1]) {
      closest = x;
      max = arr[x][1]
    }
  }
  return arr[closest];
}

const Card = ({index, room, flag, setFlag}) => {
  const rarities = [0, 0, 0, 1, 1, 2]
  const cards = ["+ Points for you", "- Points to next leading opponent", "- Points for all opponents", "1.2x point multiplier", ".75x point multiplier to next leading opponent", "Swap points with next leading opponent"]
  const names = ["Jump", "Knock", "Plague", "Boost", "Stifle", "Hook"]
  const imgs = ["https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGWLGCL-6bs-EKqbIeJsjsnK4UzGUZfuPRMA&usqp=CAU", "https://upload.wikimedia.org/wikipedia/commons/6/65/Knock_Out_%28K.O.%29_%2841_de_52_y_1_2%29_%283991668598%29.jpg", "https://images.rawpixel.com/image_social_square/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIyLTA0L2pvYjcwOS00MC14LmpwZw.jpg?s=nz1-AF4idvga2wMcx7zXHvwqnsCexy_QoOefkRNHiXQ", "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHMpBAWnLKjVe3a0U2du7xyfkne8iLEBDe4g&usqp=CAU", "https://live.staticflickr.com/8219/8323518618_ae60e3ce58_b.jpg", "https://freesvg.org/img/1342000918.png"]

  let u = room.users;
  let target

  function useCard(j , i=index) {
    if (i === 0) {
      u = room.users.map((user) => (
        user[0] === localStorage.getItem("name") ? [user[0], user[1] + Math.floor(.05*room.goal), removeVal(user[2], i)] : user
      ))
    } else if (i === 1) {
      target = findNextIndex(room.users, room.users.find((v) => v[0] === localStorage.getItem("name")))
      u = room.users.map((user) => (
        user[0] === localStorage.getItem("name") ? [user[0], user[1], removeVal(user[2], i)] : 
        user[0] === target[0] ?  [user[0], user[1] - Math.floor(.1*room.goal), user[2]]: user
      ))
    } if (i === 2) {
      u = room.users.map((user) => (
        user[0] === localStorage.getItem("name") ? [user[0], user[1], removeVal(user[2], i)] : [user[0], user[1] - Math.floor(.025*room.goal), user[2]]
      ))
    } if (i === 3) {
      u = room.users.map((user) => (
        user[0] === localStorage.getItem("name") ? [user[0], Math.floor(user[1]*1.2), removeVal(user[2], i)] : user
      ))
    } if (i === 4) {
      target = findNextIndex(room.users, room.users.find((v) => v[0] === localStorage.getItem("name")))
      u = room.users.map((user) => (
        user[0] === localStorage.getItem("name") ? [user[0], user[1], removeVal(user[2], i)] : 
        user[0] === target[0] ? [user[0], user[1]*.75, user[2]] : user
      ))
    } if (i === 5) {
      target = findNextIndex(room.users, room.users.find((v) => v[0] === localStorage.getItem("name")))
      const targetPoints = target[1]
      const hostPoints = room.users.find((v) => v[0] === localStorage.getItem("name"))[1]
      u = room.users.map((user) => (
        user[0] === target[0] ? [user[0], hostPoints, user[2]] :
        user[0] === localStorage.getItem("name") ? [user[0], targetPoints, removeVal(user[2], i)] : user
      ))
    } 

      
      axios.put(`http://localhost:3500/rooms/${room.id}`, {
        id: room.id,
        name: room.name,
        password: room.password,
        users: u,
        goal: room.goal,
        tasks: room.tasks
      })
      .then((res) => {
        setFlag(flag + 1);
      })
  }



  return (
    <div className='cardItem' onClick={useCard} style={
      rarities[index] === 0 ? {background: "#cfcfcf", color:"black"} :
      rarities[index] === 1? {background: "#748C56"} :
      {background: "#a74d4d"}
    }>
      <div class="cardImg">
        <img src={imgs[index]}/>
      </div>
      <h6 class="cardTitle">{names[index]}</h6>
      <div class="cardDesc">
        {cards[index]}
      </div>
    </div>
  )
}

export default Card