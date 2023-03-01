<template>
  <nos-loading v-if="loading">

  </nos-loading>
  <nos-alert type="no-user-found" title="Kein Mitarbeiter mit diesem Chip gefunden" v-if="unknownCard"
             @close="unknownCard = false">
  </nos-alert>
  <div class="default-page" :class="{'has-chip': response !== '', 'has-no-chip-animation': response === -1}">
    <div class="locale-time" :class="{'has-chip-animation': response !== '', 'has-no-chip-animation': response === -1}">
      <div class="time">
        {{ time }}
      </div>
      <div class="date">
        <span>{{ date.toString().split(" ")[0] }}</span>
        <span>{{ date.toString().split(" ")[1] }}</span>
        <span>{{ date.toString().split(" ")[2] }}</span>
      </div>
    </div>
    <div class="staff" v-if="card !== '' && !loading">
      <div class="welcome">
        <nobr>Herzlich Willkommen</nobr>
      </div>
      <span class="staff-name">{{ response['user_name'] }}</span>
      <div class="toggle">
        Sie haben sich erfolgreich <span class="status-in" v-if="response['login']">angemeldet</span><span
          class="status-out" v-else>abgemeldet</span>
      </div>
      <div class="time-left">
        <div class="time-progress">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NosLoading from "@/components/nos-loading";
import {ipcRenderer} from "electron";
import NosAlert from "@/components/nos-alert";

export default {
  name: "DefaultPage",
  components: {NosAlert, NosLoading},
  data() {
    return {
      card: "",
      response: "",
      unknownCard: false,
      time: this.getTime(),
      date: this.getDate(),
      loading: false,
    }
  },
  methods: {
    pad2Digits(digit) {
      return digit > 9 ? `${digit}` : `0${digit}`;
    },
    getTime() {
      let date = new Date();
      return `${this.pad2Digits(date.getHours())}:${this.pad2Digits(date.getMinutes())}:${this.pad2Digits(date.getSeconds())}`;
    },
    getDate() {
      let date = new Date();
      let month = ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'];
      return `${this.pad2Digits(date.getDate())}. ${month[date.getMonth()]} ${date.getFullYear()}`;
    },
    async toggleStaffStatus() {
      this.loading = true;
      this.unknownCard = false;

      let url = localStorage.getItem("erp-url") + '/sys/tools/rest/Timerecord/login_user?customer_path=nosgroup';

      try {
        let result = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            rfid: this.card,
          })
        });

        let response = await result.json();
        if (response['success'] === true) {
          let responseData = response['data'];
          if (responseData.is_admin === true) {
            this.$router.push(`/settings/${this.card}`);
          } else {
            this.response = responseData;
            setTimeout(() => {
              this.card = '';
              setTimeout(() => {
                this.response = '';
              }, 300);
            }, 5000);
          }
        } else {
          switch (response['msg']) {
            case "unknown rfid":
              this.card = '';
              this.unknownCard = true;
              setTimeout(() => {
                this.unknownCard = false;
              }, 5000);
              break;
          }
        }

      } catch (error) {
        this.card = '';
        alert("Fehler bei der Anfrage an das NosErp (Prüfe die Verbindung)")
        this.networkError = true;
      } finally {
        this.loading = false;
      }

    }
  },
  mounted() {
    console.log("[NosTerminal] Frontend mounted");

    setInterval(() => {
      this.time = this.getTime();
      this.date = this.getDate();
    }, 1000);

    ipcRenderer.on('rfid-chip', (evt, message) => {
      this.card = message['data'];
      if (this.response === '') {
        this.toggleStaffStatus();
      }
    });
  },
  beforeUnmount() {
    ipcRenderer.removeAllListeners('rfid-chip');
  },
}
</script>

<style scoped>
div.staff {
  font-size: 3rem;
  width: 400px !important;
  padding-left: 60px;
  padding-top: 6rem;
  padding-bottom: 4rem;
  margin-left: -100px;
  border-left: 1px solid #acacac;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

div.staff .time-left {
  margin-top: 50px;
  height: 4px;
  width: 100%;
  border-radius: 3px;
  background: #acacac;
}

div.time-left .time-progress {
  height: 4px;
  left: 0;
  width: 100%;
  animation: timeProgress 5s normal;
  background: #6257ed;
}

@keyframes timeProgress {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

div.staff .staff-name {
  margin-top: 2rem;
  font-weight: bold;
}

div.staff .welcome {

}

div.staff .toggle {
  margin-top: 2rem;
  font-size: 2.5rem;
}

span.status-in {
  color: #3fc367;
}

span.status-out {
  color: #ff0000;
}


div.default-page {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.has-chip {
  width: 70vw;
  margin-left: -2rem;
  flex-direction: row !important;
}

div.locale-time {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.has-no-chip-animation {
  animation: .3s slideRight backwards;
}

.has-chip-animation {
  animation: .3s slideRight forwards;
}

div.locale-time .time {
  font-size: 10rem;
  border-bottom: 1px solid #acacac;
}

div.locale-time div.date {
  color: #666;
  width: 100%;
  padding-top: .7rem;
  display: flex;
  justify-content: space-between;
  font-size: 4rem;
}

div.chip {
  font-size: 32px;
  margin-top: .5rem;
}


@keyframes slideRight {
  0% {
    transform: translateX(0) scale(1);
  }
  100% {
    transform: translateX(-100px) scale(0.7);
  }
}

div.line {
  height: 80vh;
  width: 1px;
  background: #acacac;
  margin-right: 10px;
}

</style>