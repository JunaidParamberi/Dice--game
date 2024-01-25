import { useEffect, useState } from 'react'
import './App.css'
import Die from './Components/Dice/Die'
import { nanoid } from 'nanoid'
import useWindowSize from 'react-use/lib/useWindowSize'
import Confetti from 'react-confetti'

function App() {

 // The User won or not state

 const {width, height} = useWindowSize() 
 
 
 function generateNewDice(){
   return {
     value : Math.floor(Math.random()* 6) + 1, 
     isHeld : false,
     id : nanoid()
    }
  }
  
  function allNewDice(){
    const newDice = []
    
    for (let i = 0; i < 10; i++){
      newDice.push(generateNewDice())
    }
    return newDice
  }
  
  const [tenzies, setTenzies] = useState(false)
  
  const [dies, setDies] = useState(allNewDice())
  
  
  useEffect(()=> {
  
      const allHeld =  dies.every(die => die.isHeld)
      const firstDiceValue = dies[0].value 

      const allSameValue = dies.every(die => die.value === firstDiceValue)

      if (allHeld && allSameValue){
        setTenzies (true)
      }
  
   },[dies])
  
  

  const diceEl = dies.map(die => (
            <Die

            key = {die.id} 
            value = {die.value}
            state = {die.isHeld}
            holdDice = {()=> holdDice(die.id)}
            />
            
            ))

  function rollDice (){
    if (!tenzies){
      setDies(prevState => prevState.map(die=>{
        return die.isHeld?
            die : 
            generateNewDice()
      }))
    } else {
      setTenzies(false)
      setDies(allNewDice())
    }
  }


  function holdDice(id){
    setDies(prevState => prevState.map(die => {
      return die.id === id ?
      {...die, isHeld : !die.isHeld} : die
    })) 
  }





  return (
    <>
    <main>
    {tenzies && <Confetti width={width} height={height} />}
    <h1 className="title">Tenzies</h1>
            <p className="instructions">
              Roll until all dice are the same. Click each die to freeze 
              it at its current value between rolls.</p>
    <div className="dice-container">

    {diceEl}
    </div>

    <button onClick={rollDice} className='roll-btn'> 
    {tenzies? "New Game " : "Roll"}
    </button>

    </main>
       
      
    </>
  )
}

export default App
