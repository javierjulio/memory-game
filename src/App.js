import { useState } from 'react';
import './App.css';
import seedrandom from 'seedrandom';
import Board from "./components/Board";

import { BottomModal } from 'react-spring-modal';
import { useTransition } from 'react-spring';

const rng = seedrandom("Javier");

function HistoryList() {
  let data = []
  let json = JSON.parse(localStorage.getItem("gameHistory")) || []
  data = json.map((item, index) => {
    let [month, date, year]    = new Date(item.completedAt).toLocaleDateString("en-US").split("/")
    let [hour, minute, _] = new Date(item.completedAt).toLocaleTimeString("en-US").split(/:| /)
    return <li key={index}>{year}/{month}/{date} {hour}:{minute} - {item.moveCount} moves</li>
  })

  return (
    <div className="records-list">
      <ol>
        { data }
      </ol>
    </div>
  )
}

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

  const [isOpen, setOpen] = useState(false);

  const showRecords = () => {
    setOpen(true)
  }

  const transition = useTransition(isOpen, null, {
    from: { transform: 'translateY(100%) translateX(-50%)', opacity: 0 },
    enter: { transform: 'translateY(0%) translateX(-50%)', opacity: 1 },
    leave: { transform: 'translateY(100%) translateX(-50%)', opacity: 0 },
  });

  return(
    <div className="app-container">
      <Board key={data.id} puzzle={data.puzzle} onCompleted={onCompleted} showRecords={showRecords} />
      <BottomModal isOpen={isOpen} onRequestClose={() => setOpen(false)} modalTransition={transition}>
        <button className="button" onClick={() => setOpen(false)}> Close </button>
        <HistoryList />
      </BottomModal>
    </div>
  )
}

export default App;
