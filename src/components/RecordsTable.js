import { useEffect, useState } from 'react';
import groupBy from "../utilities/groupBy";

function RecordsTable() {
  const [data, setData] = useState({})

  useEffect(() => {
    const json = JSON.parse(localStorage.getItem("completedGames")) || []
    setData(groupBy(json, "moveCount"))
  }, []);

  const ascOrder = (a, b) => parseInt(a) - parseInt(b);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(timestamp).toLocaleDateString(navigator.language, options)
  }

  const rows = () => {
    if (Object.keys(data).length === 0) {
      return <tr><td colSpan="3" className="text-muted text-center">No games played</td></tr>
    }

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
  )
}

export default RecordsTable;
