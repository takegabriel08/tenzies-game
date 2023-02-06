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
  const [userScores, setUserScores] = useState(JSON.parse(localStorage.getItem('userScores')) || [])
  console.log(userScores)
  useEffect(() => {
    const areHeld = dice.filter(die => die.isHeld == true).length == 10 ? true : false;
    const haveSameValue = dice.every((el, idx, arr) => { return el.value == arr[0].value })
    if (areHeld && haveSameValue) {
      setTenzies(true)
      clearInterval(intervalId.current)
      setScore(prev => ({ ...prev, gameStarted: false }))
      const newScore = { id: nanoid(), time: `${minutes}:${seconds}`, rolls: score.clicks }
      const scoreArr = [newScore, ...userScores]
      setUserScores(prev => [newScore, ...prev])
      localStorage.setItem("userScores", JSON.stringify(scoreArr))
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
    if (!tenzies) {
      setDice(dice.map(el => {
        if (el.id == id) {
          el.isHeld = !el.isHeld
        }
        return el
      }))
    }
  }

  function roll() {
    if (tenzies) {
      setTenzies(false)
      setDice(allNewDice())
      setScore({ clicks: 0, gameStarted: false })
      setSeconds(0)
      setMinutes(0)
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

  var intervalId = useRef()
  useEffect(() => {
    if (score.gameStarted && seconds == 0 && minutes == 0) {
      startTimer()
    }
    return () => clearInterval(intervalId.current)
  }, [score.gameStarted])

  function startTimer() {
    intervalId.current = setInterval(() => {
      setSeconds(prev => prev + 1)
    }, 1000)
  }

  if (seconds == 59) {
    setMinutes(prev => prev + 1)
    setSeconds(0)
  }

  return (
    <main className="App" onClick={() => { setScore(prev => ({ ...prev, gameStarted: true })) }}>
      <Score {...score} minutes={minutes} seconds={seconds} userScores={userScores} />
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
