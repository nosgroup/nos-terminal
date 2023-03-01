<template>
  <terminal-alert v-if="selectedEmployee!=='select'" :time="20" @close="selectedEmployee = 'select'">
    <register-chip @close="selectedEmployee = 'select'" :employee="selectedEmployee">

    </register-chip>
  </terminal-alert>
  <terminal-alert v-if="registerFailure !== null" @close="registerFailure = null" :time="10">
    <card-already-linked :employee="registerFailure['failure']['user']" @close="registerFailure = null" @continue="this.selectedEmployee = registerFailure['fromSelected']; this.registerFailure = null">

    </card-already-linked>
  </terminal-alert>
  <terminal-alert v-if="registeredEmployee !== null" @close="registeredEmployee = null">
    <card-successful-linked :employee="registeredEmployee">

    </card-successful-linked>
  </terminal-alert>
  <div class="settings settings-register">
    <div class="option">
      <span>Mitarbeiter wählen</span>
      <select name="" id="" style="width: 100%" v-model="selectedEmployee">
        <option value="select">Bitte wählen...</option>
        <option v-bind:value="{from_adress: employee.from_adress, name: employee.name}" v-for="(employee, index) in employeeList" :key="index">{{ employee.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import TerminalAlert from "@/components/terminal-alert";
import RegisterChip from "@/layouts/alert/register-chip";
import {ipcRenderer} from "electron";
import CardAlreadyLinked from "@/layouts/alert/card-already-linked";
import CardSuccessfulLinked from "@/layouts/alert/card-successful-linked";

export default {
  name: "settings-register",
  props: ['adminRFID'],
  components: {CardSuccessfulLinked, CardAlreadyLinked, RegisterChip, TerminalAlert},
  mounted() {
    this.$erp.getEmployees(this.adminRFID).then(result => {
      this.employeeList = result;
    });
  },
  data() {
    return {
      employeeList: [],
      selectedEmployee: 'select',
      registeredEmployee: null,
      registerFailure: null,
    }
  },
  updated() {
    ipcRenderer.removeAllListeners('rfid-chip');

    ipcRenderer.on('rfid-chip', (evt, message) => {
      this.cardDetected(message['data']);
    });
  },
  beforeUnmount() {
    ipcRenderer.removeAllListeners('rfid-chip');
  },
  methods: {
    cardDetected(card) {
      if (this.selectedEmployee === 'select') {
        return;
      }

      this.$erp.linkEmployeeWithRFID(this.selectedEmployee, card, this.adminRFID).then(result => {
        this.registeredEmployee = {
          name: result['name'],
        }
      }).catch(error => {
        this.registerFailure = {
          failure: error,
          fromSelected: this.selectedEmployee,
        };
      }).finally(() => {
        this.selectedEmployee = 'select';
      });
    }
  }
}
</script>

<style scoped>
select {
  margin-top: .5rem;
}
</style>