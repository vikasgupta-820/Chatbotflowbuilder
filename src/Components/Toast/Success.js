import React from 'react'
import "./toast.css"


const Success = ({text,handleClose}) => {
  return (
    <div className='toast-container success' onClick={handleClose}>{text}</div>
  )
}

export default Success