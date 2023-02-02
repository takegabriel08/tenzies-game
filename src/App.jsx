import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())

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
    console.log(id)
    setDice(dice.map(el => {
      if (el.id == id) {
        el.isHeld = !el.isHeld
      }
      return el
    }))
  }

  function roll() {
    setDice(prev => prev.map(die => {
      return die.isHeld ? die : { ...die, value: Math.ceil(Math.random() * 6) }
    }))
  }

  const diceElements = dice.map((elm, idx) => {
    return (
      <Die
        key={elm.id}
        {...elm}
        holdDice={() => { holdDice(elm.id) }}
      />
    )
  })

  return (
    <main className="App">
      <div className="die-container">
        {diceElements}
      </div>
      <div
        className='roll-btn'
        onClick={roll}
      >
        Roll
      </div>
    </main>
  )
}

export default App
