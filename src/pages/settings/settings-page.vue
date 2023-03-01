<template>
  <div class="settings">
    <div class="head">
      <div class="headline">
        <h1>{{ $route.name }}</h1>
        <router-link to="/">
          <i class="bi bi-x-lg"></i>
        </router-link>
      </div>
      <hr>
    </div>
    <div class="options">
      <router-link :to="`/settings/erp/${$route.params.admin_rfid}`">
        <div class="option">
          <i class="bi bi-link"></i>
          <span>ERP-Url</span>
        </div>
      </router-link>
      <router-link :to="`/settings/register/${$route.params.admin_rfid}`">
        <div class="option">
          <i class="bi bi-person-plus"></i>
          <span>Chip registrieren</span>
        </div>
      </router-link>
      <router-link :to="`/settings/deregister/${$route.params.admin_rfid}`">
        <div class="option">
          <i class="bi bi-person-dash"></i>
          <span>Chip entfernen</span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SettingsPage"
}
</script>

<style scoped>
div.options {
  margin-top: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 50px;
}

.option {
  border-radius: 1rem;
  display: flex;
  background: #4d47f5;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  color: white;
  padding: 1rem 1rem 2rem;
}

div.option i {
  font-size: 5rem;
}
</style>