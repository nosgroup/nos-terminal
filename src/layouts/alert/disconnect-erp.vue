<template>
  <div class="alert disconnect-erp-alert">
    <div class="alert-description">Verbindung trennen? ({{ this.$erp.getERPUrl() }})</div>
    <div class="description">
      <i class="bi bi-info-circle"></i>
      <div>Wird die Verbindung mit dem ERP getrennt, so muss das Terminal erneut eingerichtet werden.</div>
    </div>
    <div class="disconnect">
      <button style="background: var(--green)" @click="disconnectERP()">Verbindung trennen</button>
      <button style="background: var(--red)" @click="this.$emit('close')">Abbrechen</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "disconnect-erp",
  methods: {
    disconnectERP() {
    alert("DIESE FUNKTION WIRD DERZEIT NICHT UNTERSTÜTZT!")
      /*
      this.$erp.disconnectERP();
      this.$router.push('/guide');
    */
    }
  }
}
</script>

<style scoped>
div.erp {
  text-align: center;
  font-size: 1.2rem;
  margin-top: 2rem;
}

.erp span {
  font-weight: bold;
}

.description {
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
  display: flex;
}

.disconnect {
  margin-top: 7rem;
  display: flex;
  justify-content: space-between;
}

</style>