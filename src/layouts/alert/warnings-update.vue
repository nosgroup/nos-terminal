<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">Neues Update wurde gefunden (v1.0.0)</div>
    <div class="chip">
      <div class="card">

      </div>
      <div class="card">
        Das Update steht zum Download bereit.
        Bitte beachte, dass Updates wichtige Verbesserungen und Fehlerkorrekturen enthalten.
      </div>
    </div>
    <div class="actions">
      <button style="background: var(--green)" @click="this.$emit('continue')">Neu starten</button>
      <button style="background: var(--red)" @click="this.$emit('close')">Abbrechen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "warnings-update",
  props: [],
}
</script>

<style scoped>
div.chip {
  margin: 2rem 0;
  font-size: 1.3rem;
  text-align: center;
}

div.actions {
  margin-top: 4rem;
  display: flex;
  justify-content: space-between;
}
</style>