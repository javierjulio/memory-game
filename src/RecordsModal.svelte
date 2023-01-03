<script>
  import { createEventDispatcher, onMount } from 'svelte';
  import Modal from './Modal.svelte';
  import RecordsTable from './RecordsTable.svelte';

	const dispatch = createEventDispatcher();
	const close = () => dispatch('close');

  let persisted = false

  onMount(async () => {
    if (navigator.storage && navigator.storage.persist) {
      persisted = await navigator.storage.persist()
    }
  })
</script>

<Modal on:close>
  <div slot="header" class="modal-header">
    <!-- svelte-ignore a11y-autofocus -->
    <button autofocus class="button modal-close-button" on:click={close}>
      Close
    </button>
  </div>
  <div slot="content" class="records-list">
    <p class="text-muted">
      Your objective is to solve puzzles in the fewest moves possible.
      {#if persisted}
        Your history is persisted on this device.
      {/if}
    </p>
    <RecordsTable/>
  </div>
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
