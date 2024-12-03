<script>
  import Card from './Card.svelte';
  import { moveCount } from "./stores/moveCount"

  let { puzzle = $bindable([]), completed } = $props();

  let opened = $state([])

  function delayOf(ms, ...args) {
    return new Promise(resolve => setTimeout(resolve, ms, ...args))
  }

  function resetItem(item) {
    item.backfaceIsUp = false
  }

  function checkCompletion() {
    const puzzleCompleted = (puzzle.length === puzzle.filter((item) => item.backfaceIsUp).length)

    if (puzzleCompleted) {
      delayOf(300).then(() => {
        completed()
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

  function handleFlip(item) {
    item.backfaceIsUp = !item.backfaceIsUp

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
    <Card index={index} item={item} flipped={item.backfaceIsUp} flip={handleFlip} flippable={opened.length < 2}>
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
