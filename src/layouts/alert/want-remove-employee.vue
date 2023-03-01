<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">Möchtest du die Karte entfernen?</div>
    <div class="chip">
      <i class="bi bi-person-circle"></i>
      <span>
        {{ employee['employee']['name'] }}
      </span>
    </div>
    <div class="actions">
      <button style="background: var(--green)" @click="this.$emit('delete', employee['card'])">Ja, entfernen</button>
      <button style="background: var(--red)" @click="this.$emit('close')">Abbrechen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "want-remove-employee",
  props: ['employee']
}
</script>

<style scoped>
div.chip {
  margin: 2rem 0;
  font-size: 1.3rem;
  text-align: center;
}

div.actions {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}

div.chip {
  display: flex;
  flex-direction: column;
}

div.chip span{
  font-weight: bold;
}

div.chip i {
  font-size: 120px;
}

</style>