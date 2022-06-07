<script>
  import { createEventDispatcher, onDestroy } from 'svelte';
  import { quintOut, sineInOut } from 'svelte/easing';
  import { fade, slide } from 'svelte/transition';

  const dispatch = createEventDispatcher();
  const close = () => dispatch('close');

  let modal;

  const handle_keydown = e => {
    if (e.key === 'Escape') {
      close();
      return;
    }

    if (e.key === 'Tab') {
      // trap focus
      const nodes = modal.querySelectorAll('*');
      const tabbable = Array.from(nodes).filter(n => n.tabIndex >= 0);

      let index = tabbable.indexOf(document.activeElement);
      if (index === -1 && e.shiftKey) index = 0;

      index += tabbable.length + (e.shiftKey ? -1 : 1);
      index %= tabbable.length;

      tabbable[index].focus();
      e.preventDefault();
    }
  };

  const previously_focused = typeof document !== 'undefined' && document.activeElement;

  if (previously_focused) {
    onDestroy(() => {
      previously_focused.focus();
    });
  }
</script>

<svelte:window on:keydown={handle_keydown}/>

<div class="modal-overlay">
  <div class="modal-backdrop" transition:fade="{{ duration: 600, easing: sineInOut }}" on:click={close}>
  </div>
  <div class="modal" role="dialog" aria-modal="true" bind:this={modal} transition:slide="{{ duration: 600, easing: quintOut }}">
    <slot name="header">
    </slot>
    <slot name="content">
    </slot>
  </div>
</div>

<style>
.modal-overlay {
  bottom: 0;
  display: flex;
  justify-content: center; /* horizontally center child */
  left: 0;
  overflow: hidden;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 5;
}

.modal-backdrop {
  --opacity: 0.5;
  background-color: hsla(0, 0%, 0%, var(--opacity));
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 6;
}

@media (prefers-color-scheme: dark) {
  .modal-backdrop {
    background-color: hsla(0, 0%, 50%, calc(var(--opacity)))
  }
}

.modal {
  background-color: var(--background-color);
  --radius: 8px;
  border-top-left-radius: var(--radius);
  border-top-right-radius: var(--radius);
  bottom: 0;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.3);
  display: flex; /* so child element can be vertically scrollable if needed */
  flex-direction: column;
  height: 100%;
  max-height: 70vh;
  max-width: 400px;
  overflow: hidden;
  outline: none;
  position: absolute;
  width: 90%;
  z-index: 10;
}
</style>
