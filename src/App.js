import { useState } from 'react';
import './App.css';
import seedrandom from 'seedrandom';
import Board from "./components/Board";

const rng = seedrandom("Javier");

function App() {
  const sizes = [ [4, 4] ]// ,  [4, 5] ]

  const generatePuzzle = () => {
    const [columns, rows] = sizes[Math.floor(rng() * sizes.length)]
    const numUniquePairs = (columns * rows) / 2;

    let data = new Array(numUniquePairs).fill().map((_, index) => index + 1)
    data.push(...data)

    const puzzle = Array.from({length: data.length}, () => {
      const randomIndex = Math.floor(rng() * data.length);
      return { type: data.splice(randomIndex, 1)[0].toString() };
    })

    return { id: new Date().getTime(), puzzle: puzzle }
  }

  const [data, setData] = useState(() => generatePuzzle())

  const onCompleted = (moveCount) => {
    alert(`You won in ${moveCount} moves!`)

    let history = JSON.parse(localStorage.getItem("gameHistory")) || []
    history.push({
      moveCount: moveCount,
      completedAt: new Date().getTime()
    })
    localStorage.setItem("gameHistory", JSON.stringify(history))

    newPuzzle()
  }

  const newPuzzle = () => {
    setData(generatePuzzle())
  }

  return(
    <Board key={data.id} puzzle={data.puzzle} onCompleted={onCompleted} />
  )
}

export default App;
