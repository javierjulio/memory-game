import { useEffect, useState } from 'react';
import './App.css';
import seedrandom from 'seedrandom';
import Board from "./components/Board";

import { BottomModal } from 'react-spring-modal';
import { useTransition } from 'react-spring';

function RecordsTable() {
  const groupBy = (array, propOrFunc) => {
    return array.reduce(function (obj, item) {
      var key = typeof propOrFunc === 'function' ? propOrFunc(item) : item[propOrFunc];

      if (!obj.hasOwnProperty(key))
        obj[key] = [];

      obj[key].push(item);

      return obj;
    }, {});
  };

  const [data, setData] = useState({})

  useEffect(() => {
    const json = JSON.parse(localStorage.getItem("completedGames")) || []
    const results = groupBy(json, "moveCount")
    setData(results)
  }, []);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(timestamp).toLocaleDateString(navigator.language, options)
  }

  const rows = () => {
    if (Object.keys(data).length === 0) {
      return <tr><td colSpan="3" className="text-muted text-center">No games played</td></tr>
    }

    const ascOrder = (a, b) => parseInt(a) - parseInt(b);

    return Object.keys(data).sort(ascOrder).map(moveCount => (
        <tr key={moveCount}>
          <td>{moveCount}</td>
          <td>{data[moveCount].length}</td>
          <td>{formatDate(Math.max(...data[moveCount].map(i => i.timestamp)))}</td>
        </tr>
      )
    )
  }

  return (
    <div className="records-list">
      <p className="text-muted">Your objective is to solve puzzles in the fewest moves possible.</p>
      <table>
        <thead>
          <tr>
            <th>Moves</th>
            <th>Games</th>
            <th>Last Played</th>
          </tr>
        </thead>
        <tbody>
          { rows() }
        </tbody>
      </table>
    </div>
  )
}

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
    from: { transform: 'translateY(102%) translateX(-50%)', opacity: 0.7 },
    enter: { transform: 'translateY(0) translateX(-50%)', opacity: 1 },
    leave: { transform: 'translateY(102%) translateX(-50%)', opacity: 0.5 },
  });

  return(
    <div className="app-container">
      <Board puzzle={data.puzzle} onCompleted={onCompleted} showRecords={showRecords} />
      <BottomModal isOpen={isOpen} onRequestClose={() => setOpen(false)} modalTransition={transition}>
        <div className="modal-header">
          <button className="button modal-close-button" onClick={() => setOpen(false)}>
            Close
          </button>
        </div>
        <RecordsTable />
      </BottomModal>
    </div>
  )
}

export default App;
