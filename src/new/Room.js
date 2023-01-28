import React from 'react'
import { useParams, Link } from 'react-router-dom'

const Room = () => {
const {id} = useParams();

  return (
    <div>
      <Link to="/">{id}</Link>
    </div>
  )
}

export default Room