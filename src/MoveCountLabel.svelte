<script>
  export let count = 0
</script>

<div>
  {count} {(count === 1) ? "move" : "moves"}
</div>

<style>
  div {
    cursor: default;
    padding: .375rem .75rem;
  }
</style>
