<script>
  let {
    index = 0,
    item = { index: 0, type: 0, backfaceIsUp: false },
    flippable = true,
    flipped = false,
    flip,
    children
  } = $props();

  function clickHandler() {
    if (flippable && !flipped)
      flip(item)
  }

  function keyUpHandler(event) {
    if (event.code === "Space")
      clickHandler()
  }
</script>

<div data-testid="card-{item.type}" class="card" class:toggled={flipped} onclick={clickHandler} onkeyup={keyUpHandler} role="button" tabindex={index + 1}>
  <div class="card-front">
  </div>
  <div class="card-back">
    {@render children?.()}
  </div>
</div>

<style>
  .card {
    --flipped: 0;
    --card-size: 60px;
    --card-perspective-modifier: 8;

    cursor: pointer;
    display: grid;
    perspective: calc(var(--card-size) * var(--card-perspective-modifier));
    transition: transform .4s .2s;
    -webkit-tap-highlight-color: transparent;
  }

  .card:active {
    transform: scale(1.15);
    transition-delay: 0s;
  }

  .card.toggled {
    --flipped: 1;
  }

  .card.toggled:active {
    transform: none;
  }

  .card-front,
  .card-back {
    grid-area: 1 / -1 / 1 / -1;
    display: flex;
    align-items: center;
    justify-content: center;
    backface-visibility: hidden;
    transform-style: preserve-3d;
    transition-property: transform;
    transition-duration: .6s;
    transition-timing-function: ease;
    font-size: 30px;
    /* card size is 2.5 by 3.5 so 3.5/2.5 gets us 1.4 */
    width: var(--card-size);
    height: calc(var(--card-size) * 1.4);
    border-radius: 6px;
    box-shadow: 0 1px 6px 0 rgba(0,0,0,0.18);
  }

  .card-front {
    background-image: var(--card-front-background-image);
    transform: rotateY(calc(180deg * var(--flipped)));
  }

  .card-back {
    background-image: var(--card-back-background-image);
    color: var(--text-inverted-color);
    transform: rotateY(calc(180deg * var(--flipped) - 180deg));
  }
</style>
