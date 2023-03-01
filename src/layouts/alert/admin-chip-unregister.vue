<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">Admin-Karte kann nicht gelöscht werden!</div>
    <div class="chip">
      <div class="card">
        Derzeit können keine Admin-Karten entfernt werden.
      </div>
    </div>
    <div class="actions">
      <button style="background: var(--red)" @click="this.$emit('close')">Abbrechen</button>
    </div>
  </div>
</template>

<script>
export default {
name: "admin-chip-unregister"
}
</script>

<style scoped>
div.chip {
  margin: 2rem 0;
  font-size: 1.3rem;
  text-align: center;
}

div.actions {
  margin-top: 8.5rem;
  display: flex;
  justify-content: center;
}
button{
  width: 250px;
}
</style>