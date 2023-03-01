<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">Karte wurde <span style="color: var(--red)">entfernt</span>!</div>
    <div class="chip">
      Diese Karte kann jetzt einem anderen Mitarbeiter zugewiesen werden.
    </div>
    <div class="actions">
      <button style="background: var(--green)" @click="this.$emit('new')">Direkt zuweisen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-successful-unlinked"
}
</script>

<style scoped>
div.chip {
  margin-top: 4rem;
  text-align: center;
}

div.actions {
  display: flex;
  justify-content: center;
  margin-top: 7rem;
}
</style>