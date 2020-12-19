import { useEffect, useState } from 'react';
import './App.css';
import seedrandom from 'seedrandom';
import Board from "./components/Board";
import RecordsModal from './components/RecordsModal';

import { useTransition } from 'react-spring';

function App() {
  const generatePuzzleData = () => {
    const seed = Date.now().toString(36)
    const rng = seedrandom(seed)

    const sizes = [ [4, 4] ]//, [4, 5] ]
    const [columns, rows] = sizes[Math.floor(rng() * sizes.length)]

    const numUniqueTypes = (columns * rows) / 2
    let types = new Array(numUniqueTypes).fill().map((_, index) => index + 1)
    types.push(...types)

    const puzzleSet = Array.from({length: types.length}, () => {
      const randomIndex = Math.floor(rng() * types.length);
      return { type: types.splice(randomIndex, 1)[0] };
    })
    return { seed: seed, puzzle: puzzleSet }
  }

  useEffect(() => {
    setData(generatePuzzleData())
  }, []);

  const [data, setData] = useState({ seed: "", puzzle: []})

  const onCompleted = (moveCount) => {
    alert(`You won in ${moveCount} moves!`)

    let history = JSON.parse(localStorage.getItem("completedGames")) || []
    history.push({
      itemCount: data.puzzle.length,
      moveCount: moveCount,
      timestamp: Date.now(),
      seed: data.seed
    })
    localStorage.setItem("completedGames", JSON.stringify(history))

    newPuzzle()
  }

  const newPuzzle = () => {
    setData(generatePuzzleData())
  }

  const [isOpen, setOpen] = useState(false);

  const showRecords = () => {
    setOpen(true)
  }

  const transition = useTransition(isOpen, null, {
    // from: { transform: 'translateY(102%) translateX(-50%)', opacity: 0.7 },
    // enter: { transform: 'translateY(0) translateX(-50%)', opacity: 1 },
    // leave: { transform: 'translateY(102%) translateX(-50%)', opacity: 0.5 },
    from: { bottom: '-70vh', opacity: 0.7 },
    enter: { bottom: '0', opacity: 1 },
    leave: { bottom: '-70vh', opacity: 0.5 },
  });

  return(
    <div className="app-container">
      <Board puzzle={data.puzzle} onCompleted={onCompleted} showRecords={showRecords} />
      <RecordsModal isOpen={isOpen} onRequestClose={() => setOpen(false)} modalTransition={transition} />
    </div>
  )
}

export default App;
