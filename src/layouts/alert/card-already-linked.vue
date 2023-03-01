<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">Karte bereits registriert!</div>
    <div class="chip">
      <div class="card" v-if="employee !== 'Admin'">
        Diese Karte ist mit <span>{{ employee }}</span> registriert.
      </div>
      <div class="card" v-else>
        Diese Karte darf nicht überschrieben werden, da es eine Admin-Karte ist.
      </div>
    </div>
    <div class="actions">
      <button style="background: var(--green)" @click="this.$emit('continue')">Erneut versuchen</button>
      <button style="background: var(--red)" @click="this.$emit('close')">Abbrechen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "card-already-linked",
  props: ['employee'],
}
</script>

<style scoped>
div.chip {
  margin: 2rem 0;
  font-size: 1.3rem;
  text-align: center;
}

div.actions {
  margin-top: 10rem;
  display: flex;
  justify-content: space-between;
}
</style>