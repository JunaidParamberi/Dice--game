import React from 'react'




function Die(props) {

  return (
    <div onClick={props.holdDice} 
    className={`die-face ${props.state === true ? "color-change" : ""}`}
    >
      <h1 className="die-num" >{props.value}</h1>
    </div>
  )
}

export default Die
