<script>
  import Card from './Card.svelte';
  import { moveCount } from "./stores/moveCount"

  export let puzzle = [];
  export let onCompleted;

  let opened = []

  function delayOf(ms, ...args) {
    return new Promise(resolve => setTimeout(resolve, ms, ...args))
  }

  function resetItem(item) {
    item.backfaceIsUp = false
    puzzle = puzzle
    // puzzle[item.index].backfaceIsUp = false
  }

  function checkCompletion() {
    const completed = (puzzle.length === puzzle.filter((item) => item.backfaceIsUp).length)

    if (completed) {
      delayOf(300).then(() => {
        onCompleted()
      })
    }
  }

  function resetOpenedPair() {
    const promises = [
      delayOf(600, opened[1]).then(resetItem),
      delayOf(800, opened[0]).then(resetItem),
    ]
    Promise.all(promises).then(() => opened = [])
  }

  function flippedPairMatches() {
    return opened[0].type === opened[1].type
  }

  function handleFlip(event) {
    const item = event.detail
    puzzle[item.index].backfaceIsUp = !puzzle[item.index].backfaceIsUp
    // puzzle = [...puzzle]

    opened = [...opened, item]

    if (opened.length >= 2) {
      $moveCount++

      if (flippedPairMatches()) {
        opened = []
        checkCompletion()
      }
      else {
        resetOpenedPair()
      }
    }
  }
</script>

<div class="full-grid disable-text-selection">
  {#each puzzle as item, index (index)}
    <Card item={item} flipped={item.backfaceIsUp} on:flip={handleFlip} flippable={opened.length < 2}>
      {item.type.toString()}
    </Card>
  {/each}
</div>

<style>
.disable-text-selection {
  -webkit-touch-callout: none; /* disables long-touch menu */
  /* add svelte-preprocess for autoprefixer to remove the below */
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.full-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(4, 1fr);
  grid-gap: 20px;
  justify-items: center;
}
</style>
