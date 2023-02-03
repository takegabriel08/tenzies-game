import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Score from './components/Score'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const areHeld = dice.filter(die => die.isHeld == true).length == 10 ? true : false;
    const haveSameValue = dice.every((el, idx, arr) => { return el.value == arr[0].value })
    if (areHeld && haveSameValue) {
      setTenzies(true)
    }
  }, [dice])

  function allNewDice() {
    const random = []
    while (random.length < 10) {
      random.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return random
  }

  function holdDice(id) {
    setDice(dice.map(el => {
      if (el.id == id) {
        el.isHeld = !el.isHeld
      }
      return el
    }))
  }

  function roll() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
    } else {
      setDice(prev => prev.map(die => {
        return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
      }))
    }
  }

  const diceElements = dice.map((elm, idx) => {
    return (
      <Die
        key={elm.id}
        value={elm.value}
        isHeld={elm.isHeld}
        holdDice={() => { holdDice(elm.id) }}
      />
    )
  })

  return (
    <main className="App">
      <Score />
      {tenzies && <Confetti width={innerWidth} height={innerHeight} style={{ position: 'absolute', top: '0', left: '0' }} />}
      <div className="info-container">
        <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      </div>
      <div className="die-container">
        {diceElements}
      </div>
      <div
        className='roll-btn'
        onClick={roll}
      >
        {tenzies == true ? "New Game" : "Roll"}
      </div>
    </main>
  )
}

export default App
