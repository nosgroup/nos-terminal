<template>
  <div class="page clock-screen">
    <terminal-alert :time="5" v-if="this.staff === 'unknown_card'" @close="this.staff = null">
      <unknown-chip>

      </unknown-chip>
    </terminal-alert>
    <terminal-alert :time="5" v-if="this.forbiddenTime !== null" @close="this.forbiddenTime = null">
      <forbidden_time :time="forbiddenTime">

      </forbidden_time>
    </terminal-alert>
    <div class="middle">
      <div class="clock" :class="{animate: staff !== null, position: staff === null}">
        <div class="time">
          {{ time }}
        </div>
        <div class="line"/>
        <div class="date">
          <div class="day">
            {{ this.getDate()[0] }}.
          </div>
          <div class="month">
            {{ this.getDate()[1] }}
          </div>
          <div class="year">
            {{ this.getDate()[2] }}
          </div>
        </div>
      </div>
      <div class="employee" v-if="staff !== null && staff !== 'unknown_card'">
        <div class="welcome">
          Herzlich Willkommen
        </div>
        <div class="employee-name">
          <span class="employee-name">
            {{ staff['name'] }}
          </span>
        </div>
        <div class="status-message">
          Sie haben sich erfolgreich
        </div>
        <div class="status-value">
          <span style="color:var(--green)" v-if="staff['status']">angemeldet!</span>
          <span style="color:var(--red)" v-else>abgemeldet!</span>
        </div>
        <div class="progress-bar">
          <div class="progress"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from "electron";
import TerminalAlert from "@/components/terminal-alert";
import UnknownChip from "@/layouts/alert/unknown-chip";
import Forbidden_time from "@/layouts/alert/forbidden_time";

export default {
  name: "clock-screen",
  components: {'forbidden_time': Forbidden_time, UnknownChip, TerminalAlert},
  data() {
    return {
      time: this.getTime(),
      date: this.getDate(),
      staff: null,
      forbiddenTime: null,
    }
  },
  beforeMount() {
    ipcRenderer.on('rfid-chip', (evt, message) => {
      if (this.staff === null) {
        this.cardDetected(message['data']);
      }
    });
  },
  beforeUnmount() {
    ipcRenderer.removeAllListeners('rfid-chip');
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
      return [this.pad2Digits(date.getDate()), month[date.getMonth()], date.getFullYear()];
    },
    cardDetected(card) {
      this.$erp.getUserFromRFID(card).then(result => {
        if (result['is_admin'] !== undefined && result['is_admin'] === true) {
          this.$router.push(`/settings/${card}`);
          return;
        }

        if (result['current_adress'] !== undefined && result['user_name']) {
          let staffId = result['current_adress'];
          let staffName = result['user_name'];
          let login = result['login'];

          this.staff = {
            id: staffId,
            name: staffName,
            status: login,
          }

          setTimeout(() => {
            this.staff = null;
          }, 5000);
        }
      }).catch(error => {
        if (error['success'] === false) {
          switch (error['msg'] || error['error']['msg']) {
            case 'unknown rfid':
              this.staff = 'unknown_card';
              break;
            case 'time too early':
            case 'time too late':
              this.forbiddenTime = error['error'];
              break;
          }
        }
      });

    }
  },
  mounted() {
    setInterval(() => {
      this.time = this.getTime();
      this.date = this.getDate();
    }, 1000);
  }
}
</script>

<style scoped>
div.clock-screen {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: calc(100vh - 180px);
}

div.middle {
  transition: .5s;
  display: flex;
  align-items: center;
  gap: 4rem;
}

div.middle .line {
  width: 100%;
  height: 1px;
  background: var(--border-color);
}

div.middle .date {
  margin-top: .5rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.animate {
  animation: .5s animateClock forwards;
}

.position {
  margin-top: -80px;
}

div.time {
  font-size: 6rem;
}

div.date {
  font-size: 2rem;
}

div.employee {
  min-height: 60vh;
  border-left: 1px solid var(--border-color);
  padding-left: 4rem;
  margin-right: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

span.employee-name {
  font-weight: bold;
}

div.employee {
  font-size: 1.6rem;
}

div.employee > * {
  white-space: nowrap;
}

div.employee .status-message {
  margin-top: 3rem;
}

div.progress-bar {
  margin-top: 2rem;
  height: 5px;
  width: 100%;
  border-radius: 5px;
  background: var(--border-color);
}

div.progress-bar .progress {
  height: 5px;
  background: var(--primary);
  border-radius: 5px;
  animation: 5s progress forwards;
}

@keyframes progress {
  0% {
    width: 100%;
  }
  100% {
    width: 0;
  }
}

@keyframes animateClock {
  0% {
    transform: scale(1);
    margin-left: 100px;
  }
  100% {
    transform: scale(.7);
    margin-left: -20px;
    margin-right: -40px;
  }
}
</style>