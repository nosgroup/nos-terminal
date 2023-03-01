<template>
  <div class="settings">
    <div class="headline">
      <h1>{{ $route.name }}</h1>
      <router-link :to="`/settings/${$route.params.admin_rfid}`">
        <i class="bi bi-arrow-return-left"></i>
      </router-link>
    </div>
    <hr>
    <div class="content">
      <div class="option">
        <span>Wählen Sie einen Mitarbeiter aus</span>
        <select name="employee" id="selected" v-model="selectedStaff">
          <option value="select" selected>wählen...</option>
          <option v-bind:value="{from_adress: staff.from_adress, name: staff.name}" v-for="staff in staffList"
                  :key="staff">{{ staff.name }}
          </option>
        </select>
      </div>
      <nos-alert v-if="selectedStaff !== 'select'" type="register"
                 title="Bitte gewünschten Chip an das Lesegerät halten" @close="this.selectedStaff = 'select'"
                 :staff="selectedStaff">

      </nos-alert>
    </div>
    <div class="save" style="margin-top: 100px">
      <button>
        Fertig
      </button>
    </div>
  </div>
</template>

<script>
import NosAlert from "@/components/nos-alert";

export default {
  name: "SettingsRegisterPage",
  components: {NosAlert},
  data() {
    return {
      selectedStaff: 'select',
      staffs: '',
      staffList: [],
    }
  },
  methods: {
    async insertCards() {
      try {
        let url = localStorage.getItem("erp-url") + '/sys/tools/rest/Timerecord/get_user_list?customer_path=nosgroup';
        let result = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            admin_rfid: this.$route.params.admin_rfid,
          })
        });


        let response = await result.json();

        if (response['success'] === true) {
          for (let singleStaff of response['data']) {
            if (!this.staffList.includes(this.staffList.find(staff => staff.from_adress === singleStaff.from_adress))) {
              this.staffList.push(singleStaff);
            }
          }
        } else {
          alert("FAILED");
        }

      } catch (error) {
        this.networkError = true;
      } finally {
        this.loading = false;
      }
    }
  },
  mounted() {
    this.insertCards();
  }
}
</script>

<style scoped>
div.option {
  display: flex;
  flex-direction: column;
}

select {

}

span {
  font-size: 2rem;
  padding: 1rem 0;
}
</style>