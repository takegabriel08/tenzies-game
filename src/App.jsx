import { useState, useEffect } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const areHeld = dice.filter(die => die.isHeld == true).length == 10 ? true : false;
    const haveSameValue = dice.every((el, idx, arr) => { return el.value == arr[0].value })
    console.log(areHeld)
    console.log(haveSameValue)
    if (areHeld && haveSameValue) {
      console.log('You win')
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
        Roll
      </div>
    </main>
  )
}

export default App
