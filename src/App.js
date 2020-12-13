import { useState } from 'react';
import './App.css';
import seedrandom from 'seedrandom';

const rng = seedrandom("Javier");

const delayOf = (ms, ...args) => {
  return new Promise(resolve => setTimeout(resolve, ms, ...args))
}

function Card({ item, disableAction, onOpen }) {
  let classNames = ["cell", "card"]
  if (item.backfaceIsUp) {
    classNames.push("toggled")
  }

  const clickHandler = (event) => {
    if (!disableAction && !item.backfaceIsUp)
      onOpen(item)
  }

  return (
    <div className={classNames.join(" ")} onClick={clickHandler}>
      <div className="card-front"></div>
      <div className="card-back">{item.type}</div>
    </div>
  )
}

function MoveCountLabel({ count }) {
  const label = (count === 1) ? "move" : "moves"
  return (
    <div className="move-label">
      {count} {label}
    </div>
  )
}

function Board({ puzzle, onCompleted }) {

  const [solution, setSolution] = useState(() => {
    return Array.from(puzzle, (item, index) => {
      return { index: index, type: item.type, backfaceIsUp: false }
    })
  })

  const [opened, setOpened] = useState([])

  const [moveCount, setMoveCount] = useState(0)

  const resetByIndex = (index) => {
    solution[index].backfaceIsUp = false
    setSolution([...solution])
  }

  const isCompleted = () => {
    return (puzzle.length === solution.filter((item) => item.backfaceIsUp).length)
  }

  const onOpen = (item) => {
    solution[item.index].backfaceIsUp = !solution[item.index].backfaceIsUp
    setSolution([...solution])

    opened.push(item.index)
    setOpened([...opened])

    if (opened.length >= 2) {
      setMoveCount(moveCount + 1)

      if (solution[opened[0]].type === solution[opened[1]].type) {
        setOpened([])

        if (isCompleted()) {
          // FIXME: moveCount here won't be updated in either scope so its off by 1
          delayOf(600, moveCount + 1).then((count) => {
            onCompleted(count)
          })
        }
      }
      else {
        Promise.all([
          delayOf(600, opened[1]).then(resetByIndex),
          delayOf(800, opened[0]).then(resetByIndex)
        ]).then(() => {
          setOpened([])
        })
      }
    }
  }

  const renderCards = () => {
    return solution.map((item, index) => {
      return <Card key={index} item={item} onOpen={onOpen} disableAction={opened.length >= 2} />
    });
  }

  return (
    <div>
      <div className="full-grid disable-text-selection">
        { renderCards() }
      </div>
      <div className="footer-bar">
        <MoveCountLabel count={moveCount} />
      </div>
    </div>
  )
}

function App() {
  const sizes = [ [4, 4] ]// ,  [4, 5] ]

  const generatePuzzle = () => {
    const [columns, rows] = sizes[Math.floor(rng() * sizes.length)]
    const totalCards = columns * rows

    // function isOddNumber(n) {
    //   return Math.abs(n % 2) === 1;
    // }

    // if (isOddNumber(totalCards)) {
    //   throw("The number of total cards must be even!")
    // }

    const numUniquePairs = totalCards / 2;

    let data = new Array(numUniquePairs).fill().map((_, index) => index + 1)
    data.push(...data)

    const puzzle = Array.from({length: data.length}, () => {
      const randomIndex = Math.floor(Math.random() * data.length);
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
