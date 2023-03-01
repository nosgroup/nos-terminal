<template>
  <div class="settings">
    <div class="head">
      <div class="headline">
        <h1>{{ $route.name }}</h1>
        <router-link :to="`/settings/${$route.params.admin_rfid}`">
          <i class="bi bi-arrow-return-left"></i>
        </router-link>
      </div>
      <hr>
    </div>
    <div class="content">
      <div class="erp-unlink option">
        <span>Verbindung zu <b>{{getERPUrl()}}</b> aufheben</span>
        <button @click="unlinkClicked = true">Trennen</button>
      </div>
      <nos-alert title="Möchten Sie die Verbindung zum ERP aufheben?" type="unlink-erp" @close="unlinkClicked = false"
                 v-if="unlinkClicked" @confirm="unlinkErp">

      </nos-alert>
    </div>
  </div>
</template>

<script>
import NosAlert from "@/components/nos-alert";

export default {
  name: "SettingsErpPage",
  components: {NosAlert},
  data() {
    return {
      unlinkClicked: false,
    }
  },
  methods: {
    getERPUrl(){
      return localStorage.getItem('erp-url');
    },
    unlinkErp() {
      localStorage.clear();
      this.$router.push('/guide');
    }
  }
}
</script>

<style scoped>
div.option {
  display: flex;
  flex-direction: column;
}

span {
  font-size: 2rem;
  padding: 1rem 0;
}

div.erp-unlink > button {
  background: #ff0000;
}
</style>