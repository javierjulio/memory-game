<script>
  import groupBy from './groupBy'
  import { liveQuery } from "dexie"
  import { db } from "./db"

  const ascOrder = (a, b) => parseInt(a) - parseInt(b);

  const formatDate = (timestamp) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' }
    return new Date(timestamp).toLocaleDateString(navigator.language, options)
  }

  // https://dexie.org/docs/Tutorial/Svelte
  let data = liveQuery(() => db.completedGames.toArray())

  $: recordsData = groupBy($data || [], "moveCount");
</script>

<table>
  <thead>
    <tr>
      <th scope="col">Moves</th>
      <th scope="col">Games</th>
      <th scope="col">Last Played</th>
    </tr>
  </thead>
  <tbody>
    {#if $data && $data.length === 0 }
      <tr><td colSpan="3" class="muted centered">No games played</td></tr>
    {:else}
      {#each Object.keys(recordsData).sort(ascOrder) as moveCount, index (index)}
        <tr>
          <td>{moveCount}</td>
          <td>{recordsData[moveCount].length}</td>
          <td>{formatDate(Math.max(...recordsData[moveCount].map(i => i.timestamp)))}</td>
        </tr>
      {/each}
    {/if}
  </tbody>
</table>

<style>
table {
  border-collapse: collapse;
  border-color: var(--table-row-border-color);
  caption-side: bottom;
  margin-bottom: 1rem;
  vertical-align: top;
  width: 100%;
}

table > thead {
  vertical-align: bottom;
}

table > tbody {
  vertical-align: inherit;
}

th,
td {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

th {
  border-bottom-color: currentColor;
}

th,
td {
  border-bottom-width: 1px;
  padding: 0.5rem 0.5rem;
  text-align: center;
}

.muted {
  color: var(--text-muted-color);
}

.centered {
  text-align: center;
}
</style>
