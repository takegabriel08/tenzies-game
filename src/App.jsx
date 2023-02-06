import { useState, useEffect, useRef } from 'react'
import Die from './components/Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'
import Score from './components/Score'
import './App.css'

function App() {
  const [dice, setDice] = useState(allNewDice())
  const [tenzies, setTenzies] = useState(false)
  const [score, setScore] = useState({ clicks: 0, gameStarted: false })
  const [seconds, setSeconds] = useState(0)
  const [minutes, setMinutes] = useState(0)

  useEffect(() => {
    const areHeld = dice.filter(die => die.isHeld == true).length == 10 ? true : false;
    const haveSameValue = dice.every((el, idx, arr) => { return el.value == arr[0].value })
    if (areHeld && haveSameValue) {
      setTenzies(true)
      clearInterval(id.current)
      setScore(prev => ({ ...prev, gameStarted: false }))
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
      setScore({ clicks: 0, gameStarted: false })
      setSeconds(0)
    } else {
      setScore(prev => ({ ...prev, clicks: prev.clicks + 1 }))
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

  var id = useRef()
  useEffect(() => {
    if (score.gameStarted && seconds == 0 && minutes == 0) {
      startTimer()
    }
    return () => clearInterval(id.current)
  }, [score.gameStarted])

  function startTimer() {
    console.log('started')
    id.current = setInterval(() => {
      setSeconds(prev => prev + 1)
      console.log(seconds)
    }, 1000)
  }

  if (seconds == 59) {
    setMinutes(prev => prev + 1)
    setSeconds(0)
  }

  return (
    <main className="App" onClick={() => { setScore(prev => ({ ...prev, gameStarted: true })) }}>
      <div className="roll-btn" onClick={startTimer}>start timer</div>
      <Score {...score} minutes={minutes} seconds={seconds} />
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
