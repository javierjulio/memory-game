import { useEffect, useState } from 'react';
import Card from "./Card";
import MoveCountLabel from "./MoveCountLabel";
import { ReactComponent as AwardIcon } from "../svgs/award.svg";

const delayOf = (ms, ...args) => {
  return new Promise(resolve => setTimeout(resolve, ms, ...args))
}

function Board({ puzzle, onCompleted, showRecords }) {
  const [solution, setSolution] = useState([])

  const [opened, setOpened] = useState([])

  const [moveCount, setMoveCount] = useState(0)

  useEffect(() => {
    setSolution(
      Array.from(puzzle, (item, index) => {
        return { index: index, type: item.type, backfaceIsUp: false }
      })
    )
    setMoveCount(0)
    setOpened([])
  }, [puzzle])

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
    <div className="disable-text-selection">
      <div className="full-grid">
        { renderCards() }
      </div>
      <div className="footer-bar">
        <MoveCountLabel count={moveCount} />
        <button className="button" onClick={showRecords}>
          <span className="icon">
            <AwardIcon />
          </span>
          Records
        </button>
      </div>
    </div>
  )
}

export default Board;
