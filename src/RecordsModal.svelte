<script>
  import Modal from './Modal.svelte';
  import RecordsTable from './RecordsTable.svelte';

  let { close } = $props();
</script>

<Modal close={close}>
  {#snippet header()}
    <div  class="modal-header">
      <!-- svelte-ignore a11y_autofocus -->
      <button autofocus class="button modal-close-button" onclick={close}>
        Close
      </button>
    </div>
  {/snippet}
  {#snippet content()}
    <div  class="records-list">
      <p class="text-muted">Your objective is to solve puzzles in the fewest moves possible. Your history is persisted on this device.</p>
      <RecordsTable/>
    </div>
  {/snippet}
</Modal>

<style>
.modal-header {
  border-bottom: 1px solid var(--table-row-border-color);
  padding: 1rem;
  text-align: center;
}

.modal-close-button {
  justify-content: center;
  width: 70%;
}

.records-list {
  overflow-y: auto;
  padding: 0 1rem 1rem 1rem;
}
</style>
