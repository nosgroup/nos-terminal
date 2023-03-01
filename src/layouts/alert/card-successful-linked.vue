<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">Erfolgreich verknüpft!</div>
    <div class="employee-card">
      <staff-card :name="employee['name']" view="success">

      </staff-card>
    </div>
  </div>
</template>

<script>
import StaffCard from "@/components/staff-card";

export default {
  name: "card-successful-linked",
  components: {StaffCard},
  props: ['employee'],
}
</script>

<style scoped>
div.employee-card {
  display: flex;
  margin-top: 4rem;
  justify-content: center;
}
</style>