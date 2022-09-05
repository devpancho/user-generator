import React from 'react'


 const Button =({isActive,clicked}) => {
  return (
    <div>
        <button onClick={clicked}>{isActive ? "NEW USER" : "USER"}</button>
    </div>
  )
}

export default Button