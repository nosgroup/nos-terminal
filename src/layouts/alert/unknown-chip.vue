<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">Der Chip konnte <span>keinem</span> Mitarbeiter zugeordnet werden.</div>
    <div class="chip">
      <div class="card">
        <staff-card view="unknown">

        </staff-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "unknown-chip"
}
</script>

<style scoped>
  div.chip{
    height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>