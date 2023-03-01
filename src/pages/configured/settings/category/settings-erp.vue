<template>
  <terminal-alert :time="30" v-if="disconnectAlert" @close="disconnectAlert = false">
    <disconnect-erp @close="disconnectAlert = false">

    </disconnect-erp>
  </terminal-alert>
  <div class="setting-page settings-erp">
    <div class="option">
      Aktuelle Verbindung: <span>{{ this.$erp.getERPUrl() }}</span>
    </div>
    <div class="option">
      <button style="background: var(--red)" @click="disconnectAlert = true">Verbindung Trennen</button>
    </div>
  </div>
</template>

<script>
import TerminalAlert from "@/components/terminal-alert";
import DisconnectErp from "@/layouts/alert/disconnect-erp";

export default {
  name: "settings-erp",
  components: {DisconnectErp, TerminalAlert},
  data() {
    return {
      disconnectAlert: false,
    }
  }
}
</script>

<style scoped>

</style>