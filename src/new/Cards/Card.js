import React from 'react'
import {useState, useEffect} from 'react'
import axios from "axios"

function removeVal(arr, val) {
  for (let x=0; x < arr.length; x++) {
    if (arr[x] === val) {
      return arr.slice(0, x).concat(arr.slice(x))
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
  return closest;
}

const Card = ({index, room, flag, setFlag}) => {
  const rarities = [0, 0, 0, 1, 1, 2]
  const cards = ["+ Points for you", "- Points to leading opponent", "Double next task point gain", "1.2x point multiplier", ".75x point multiplier to leading opponent", "Swap points with leading opponent"]
  
  let offset = 0;
  function useCard(index) {
    if (index < 2) {
      if (index === 0) {
        offset = .05
      } else {
        offset = -.1
      }

      axios.put(`http://localhost:3500/rooms/${room.id}`, {
        id: room.id,
        name: room.name,
        password: room.password,
        users: room.users.map((user) => (
          user[0] === localStorage.getItem("name") ? [user[0], user[1] + Math.floor(offset*room.goal), removeVal(user[2], index)] : user
        )),
        goal: room.goal,
        tasks: room.tasks.map((t) => ({
            title: t.title,
            description: t.description,
            value: t.value,
            achieved: t.achieved,
            redo: t.redo
          }
        ))
      })
      .then((res) => {
        setFlag(flag + 1);
      })

    } else if (index < 5) {

    }
  }

  const user = useCard(index);

  const [cardList,setCardList] = useState([
    {
        "name" : "point-increaser",
        "multply-factor" : 1.5,
        "rarity" : "common"
    },
    {
        "name" : "point-decreasor",
        "divide-factor" : 1.5,
        "rarity" : "rare"
    },
    {
        "name" : "point-steel",
        "steel-factor" : .05,
        "rarity" : "legendary"
    }
  ]);


  return (
    <div onClick={() => user}>{cards[index]}</div>
  )
}

export default Card