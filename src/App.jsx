import { useState, useEffect } from 'react'
import Die from './components/Die'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())

  function allNewDice() {
    const random = []
    while (random.length < 10) {
      random.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false
      })
    }
    return random
  }

  function roll() {
    setDice(prev => allNewDice())
  }

  const diceElements = dice.map((elm, idx) => {
    return (
      <Die
        key={idx}
        value={elm.value}
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
