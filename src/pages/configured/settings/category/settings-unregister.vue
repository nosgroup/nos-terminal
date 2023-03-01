<template>
  <terminal-alert v-if="detectedEmployee !== null" @close="detectedEmployee = null" :time="10">
    <want-remove-employee :employee="detectedEmployee" @close="detectedEmployee = null" @delete="deleteEmployeeCard($event)">

    </want-remove-employee>
  </terminal-alert>
  <terminal-alert :time="10" v-if="adminUnregister" @close="adminUnregister = false">
    <admin-chip-unregister @close="adminUnregister = false">

    </admin-chip-unregister>
  </terminal-alert>
  <terminal-alert :time="5" v-if="unknownChip" @close="unknownChip = false">
    <unknown-chip>

    </unknown-chip>
  </terminal-alert>
  <terminal-alert v-if="successDelete !== null" @close="successDelete = null">
    <card-successful-unlinked @new="switchToRegisterPage">

    </card-successful-unlinked>
  </terminal-alert>
  <div class="settings settings-unregister">
    <register-chip :employee="{name: 'Max Mustermann'}" style="margin-top: .4rem">

    </register-chip>
  </div>
</template>

<script>
import RegisterChip from "@/layouts/alert/register-chip";
import {ipcRenderer} from "electron";
import TerminalAlert from "@/components/terminal-alert";
import WantRemoveEmployee from "@/layouts/alert/want-remove-employee";
import UnknownChip from "@/layouts/alert/unknown-chip";
import CardSuccessfulUnlinked from "@/layouts/alert/card-successful-unlinked";
import AdminChipUnregister from "@/layouts/alert/admin-chip-unregister";

export default {
  name: "settings-deregister",
  components: {
    AdminChipUnregister,
    CardSuccessfulUnlinked,
    UnknownChip,
    WantRemoveEmployee,
    TerminalAlert,
    RegisterChip
  },
  props: ['adminRFID'],
  beforeMount() {
    ipcRenderer.on('rfid-chip', (evt, message) => {
      this.cardDetected(message['data']);
    });
  },
  beforeUnmount() {
    ipcRenderer.removeAllListeners('rfid-chip');
  },
  data() {
    return {
      detectedEmployee: null,
      successDelete: null,
      unknownChip: false,
      adminUnregister: false,
    }
  },
  methods: {
    switchToRegisterPage() {
      this.$emit('new');
    },
    deleteEmployeeCard(card) {
      this.$erp.unlinkEmployeeFromCard(card, this.adminRFID).then(result => {
        this.successDelete = result;
      }).catch(error => {
        console.log(error)
      });
    },
    cardDetected(card) {
      this.$erp.getEmployeeInfo(card, this.adminRFID).then(result => {
        if (result['is_admin']) {
          this.adminUnregister = true;
          return;
        }

        if (result['from_adress'] === undefined) {
          this.unknownChip = true;
          return;
        }

        this.detectedEmployee = {employee: result, card: card};
      });
    }
  }
}
</script>

<style scoped>
div.settings-unregister {
  display: flex;
  justify-content: center;
}

</style>