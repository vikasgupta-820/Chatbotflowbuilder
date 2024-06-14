import React from 'react'
import "./toast.css"

const Error = ({text,handleClose}) => {
  return (
    <div className='toast-container error' onClick={handleClose}>{text}</div>
  )
}

export default Error