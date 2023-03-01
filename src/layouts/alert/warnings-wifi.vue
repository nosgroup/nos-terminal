<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">
      Keine Netzwerkverbindung!
    </div>
    <div class="description">
      Bitte prüfe zunächst deine Netzwerkeinstellungen und Firewall. Wenn das Problem weiterhin besteht, wende dich bitte an deinen Systemadministrator.
    </div>
    <div class="chip">
      <div class="card">
        <i class="bi bi-wifi-off" style="font-size: 140px; color: #ff0000"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "warnings-wifi",
  props: [],
}
</script>

<style scoped>
div.chip {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}

div.description{
  font-size: 18px;
  text-align: center;
}
</style>