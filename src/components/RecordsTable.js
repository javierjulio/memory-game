import groupBy from "../utilities/groupBy";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "../lib/db";

function RecordsTable() {
  const data = useLiveQuery(() => db.completedGames.toArray());

  if (!data) {
    return null;
  }

  const ascOrder = (a, b) => parseInt(a) - parseInt(b);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(timestamp).toLocaleDateString(navigator.language, options)
  }

  const rows = () => {
    const recordsData = groupBy(data || [], "moveCount");

    if (Object.keys(recordsData).length === 0) {
      return <tr><td colSpan="3" className="text-muted text-center">No games played</td></tr>
    }

    return Object.keys(recordsData).sort(ascOrder).map(moveCount => (
        <tr key={moveCount}>
          <td>{moveCount}</td>
          <td>{recordsData[moveCount].length}</td>
          <td>{formatDate(Math.max(...recordsData[moveCount].map(i => i.timestamp)))}</td>
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
