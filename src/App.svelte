<script>
  import Board from './Board.svelte';
  import RecordsButton from './RecordsButton.svelte';
  import RecordsModal from './RecordsModal.svelte';
  import MoveCountLabel from './MoveCountLabel.svelte';
  import { db } from "./db"
  import { moveCount } from "./stores/moveCount"

  function generatePuzzleData() {
    // const seed = Date.now().toString(36)
    const rng = Math.random//seedrandom(seed)

    const sizes = [ [4, 4] ]//, [4, 5] ]
    const [columns, rows] = sizes[Math.floor(rng() * sizes.length)]

    const numUniqueTypes = (columns * rows) / 2
    let types = new Array(numUniqueTypes).fill().map((_, index) => index + 1)
    types.push(...types)

    const puzzleSet = Array.from({length: types.length}, (item, index) => {
      const randomIndex = Math.floor(rng() * types.length);
      return { index: index, type: types.splice(randomIndex, 1)[0], backfaceIsUp: false };
    })
    // return { seed: seed, puzzle: puzzleSet }

    console.log('new puzzle!')
    const pd = puzzleSet.map(i => i.type)
    for (var i = 0; i < rows; i++) {
      console.log(pd.splice(0, columns))
    }

    return { puzzle: puzzleSet }
  }

  let puzzleData = generatePuzzleData()

  const saveCompletedGame = async (moveCount) => {
    await db.completedGames.add({
      itemCount: puzzleData.puzzle.length,
      moveCount: moveCount,
      timestamp: Date.now(),
      // seed: data.seed
    });
  }

  function onCompleted(moveCount) {
    alert(`You won in ${moveCount} moves!`)
    saveCompletedGame(moveCount)
    puzzleData = generatePuzzleData()
  }

  let showModal = false;
</script>

<div class="app-root">
  <div class="app-container">
    <Board puzzle={puzzleData.puzzle} onCompleted={onCompleted}/>
    <div class="footer-bar">
      <MoveCountLabel count={$moveCount}/>
      <RecordsButton on:click={() => showModal = true}/>
    </div>
  </div>
</div>
{#if showModal}
  <RecordsModal on:close="{() => showModal = false}"/>
{/if}

<style>
.app-root {
  display: grid;
  height: 100%;
  margin: 0;
  padding: 0;
}

.app-container {
  margin: auto; /* to center in both directions, along with .app-root grid */
  max-width: 340px;
  padding: 1rem;
}

.footer-bar {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 36px;
  padding: 0 4px;
}
</style>
