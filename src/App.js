import { useEffect, useState } from 'react';
import './App.css';
import seedrandom from 'seedrandom';
import Board from "./components/Board";
import RecordsModal from './components/RecordsModal';

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
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);

  return(
    <div className="app-container">
      <Board puzzle={data.puzzle} onCompleted={onCompleted} showRecords={openModal} />
      <RecordsModal isOpen={isOpen} onClose={closeModal} onDismiss={closeModal} />
    </div>
  )
}

export default App;
