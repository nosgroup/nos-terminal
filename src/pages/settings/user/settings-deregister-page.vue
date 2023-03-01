<template>
  <nos-alert type="unregister" v-if="address !== null" :staff="address" @close="address = null; chip = ''"
             @confirm="this.sureUnlink">

  </nos-alert>
  <nos-alert v-if="success !== null" :type="success['type']" :title="success['title']" @close="success = null;">

  </nos-alert>
  <div class="settings">
    <div class="headline">
      <h1>{{ $route.name }}</h1>
      <router-link :to="`/settings/${$route.params.admin_rfid}`">
        <i class="bi bi-arrow-return-left"></i>
      </router-link>
    </div>
    <hr>
    <div class="options">
      <span class="title">Halten Sie den gewünschten Chip an das Lesegerät</span>
      <div class="animation" v-if="address === null && success === null">
        <div class="reader">
          <div class="reader__bar"></div>
          <div class="reader__placeholder"></div>
          <div class="reader__cc-shadow"></div>
        </div>
        <div class="cc">
          <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
               class="" x="0px" y="0px" viewBox="0 0 300 300" xml:space="preserve" data-v-51ca8519=""><g data-v-51ca8519=""><path class="st0" d="M272.84,91.94c43.32,52.06,33.79,135.11-21.3,175.51c-55.1,40.39-134.89,30.92-178.23-21.12
					c-4.29-5.16-8.07-10.54-11.33-16.1c45,39.24,114.69,43.31,164.33,6.92s62.3-108.94,32.64-159.41
					C263.91,82.05,268.56,86.78,272.84,91.94" data-v-51ca8519=""></path><path class="st0" d="M112.92,291.32c-67.72-1.5-118.09-56.61-112.5-123.08C5.99,101.76,65.41,49.11,133.12,50.6
					c6.72,0.15,13.26,0.83,19.58,1.98C93.58,60.54,44.86,109.23,39.84,169.11s35.35,110.55,92.92,121.09
					C126.26,291.07,119.63,291.47,112.92,291.32" data-v-51ca8519=""></path><path class="st0" d="M42.9,66.4C75.87,9.1,149.23-8.2,206.75,27.75c57.51,35.96,77.39,111.56,44.43,168.85
					c-3.28,5.68-6.94,10.96-10.95,15.84c20.41-54.38-0.86-118.95-52.69-151.34C135.73,28.69,71.06,39.53,34.64,83.9
					C36.89,77.94,39.63,72.08,42.9,66.4" data-v-51ca8519=""></path></g></svg>
          <span>Max Mustermann</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {ipcRenderer} from "electron";
import NosAlert from "@/components/nos-alert";

export default {
  name: "SettingsDeregisterPage",
  components: {NosAlert},
  data() {
    return {
      address: null,
      chip: '',
      success: null,
    }
  },
  beforeUnmount() {
    ipcRenderer.removeAllListeners('rfid-chip');
  },
  mounted() {
    ipcRenderer.on('rfid-chip', (evt, message) => {
      this.unlinkRFIDWithStaff(message['data']);
      this.chip = message['data'];
    });
  },
  methods: {
    async sureUnlink() {
      this.address = null
      try {
        let url = localStorage.getItem("erp-url") + '/' +
            'sys/tools/rest/Timerecord/remove_card_from_user?customer_path=nosgroup';
        let result = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            admin_rfid: this.$route.params.admin_rfid,
            rfid: this.chip,
          })
        });

        let response = await result.json();
        console.log(response);
        if (response['success'] === true) {
          this.success = {
            title: 'Chip wurde erfolgreich entfernt',
            type: 'success_delete',
          }
        } else {
          this.success = {
            title: response['msg'],
            type: 'failed_delete',
          }
        }

      } catch (error) {
        this.networkError = true;
      } finally {
        this.loading = false;
      }
    },
    async unlinkRFIDWithStaff(card) {

      try {
        let url = localStorage.getItem("erp-url") + '/sys/tools/rest/Timerecord/get_chip_user?customer_path=nosgroup';
        let result = await fetch(url, {
          method: 'POST',
          mode: 'cors',
          cache: 'no-cache',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            admin_rfid: this.$route.params.admin_rfid,
            rfid: card,
          })
        });

        let response = await result.json();
        console.log(response);
        if (response['success'] === true) {
          this.address = response['data'];
        } else {
          alert("FAILED");
        }

      } catch (error) {
        this.networkError = true;
      } finally {
        this.loading = false;
      }
    }
  }
}
</script>

<style scoped>

div.options {
  position: relative;
  height: 400px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  --cc: #6257ed;
  --cc-shadow: #121214;
  --cc-chip: #fff;
  --reader: #313135;
  --reader-bar: #000;
  --reader-bar-length: 85px;
  --reader-bar-active: #3fc367;
  --reader-markers: #48484b;
}

div.options span.title {
  font-size: 2rem;
  padding: 2rem;
}

div.animation {
  display: flex;
  justify-content: center;
  align-items: center;
}

.reader {
  width: 250px;
  height: 250px;
  background: var(--reader);
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  animation: reader 3s cubic-bezier(0.7, 0.1, 0.65, 0.99) infinite;
}

.reader__bar {

  width: var(--reader-bar-length);
  height: 5px;
  background: var(--reader-bar);
  border-radius: 7px;
  position: absolute;
  left: 50%;
  margin-left: calc(-1 * (var(--reader-bar-length) / 2));
  top: 15px;
  animation: reader-bar 3s cubic-bezier(0.7, 0.1, 0.65, 0.99) infinite;
}

.reader__placeholder {
  width: 200px;
  height: 170px;
  border: 2px solid var(--reader-markers);
  border-radius: 10px;
  position: absolute;
  top: 50px;
  left: 25px;
  clip-path: polygon(0 0, 25% 0, 25% 25%, 75% 25%, 75% 0, 100% 0, 100% 25%, 90% 10%, 90% 75%, 100% 75%, 100% 100%, 75% 100%, 75% 90%, 25% 75%, 25% 100%, 0 100%, 0 75%, 10% 75%, 10% 25%, 0 25%);
  transform: scale(0.9);
  animation: reader-placeholder 3s cubic-bezier(0.7, 0.1, 0.65, 0.99) infinite;
}

.reader__cc-shadow {
  width: 150px;
  height: 135px;
  background: var(--cc-shadow);
  opacity: 0.6;
  border-radius: 10px;
  position: absolute;
  right: -20px;
  top: 67px;
  animation: cc-shadow 3s cubic-bezier(0.7, 0.1, 0.65, 0.99) infinite;
}

.cc {
  background: var(--cc);
  border-radius: 7px;
  height: 90px;
  width: 150px;
  z-index: 2;
  position: relative;
  transform: scale(1.2) translate(-45px, -25px);
  animation: cc 3s cubic-bezier(0.7, 0.1, 0.65, 0.99) infinite;
  padding: 1rem;
  align-items: start;
  display: flex;
  flex-direction: column;
}

.cc svg {
  height: 30px;
  fill: white;
}

.cc span {
  margin-top: 2.5rem;
}

@keyframes cc {
  0%, 20% {
    transform: scale(1.2) translate(-45px, -25px);
  }
  38%, 70% {
    transform: scale(1) translate(-75px, 0px);
  }
  85%, 100% {
    transform: scale(1.2) translate(-45px, -25px);
  }
}

@keyframes cc-shadow {
  0%, 20% {
    transform: scale(1);
    opacity: 0.6;
  }
  38%, 70% {
    transform: scale(0.8);
    opacity: 1;
  }
  80%, 100% {
    transform: scale(1);
    opacity: 0.6;
  }
}

@keyframes reader {
  0%, 20% {
    transform: translateX(0);
  }
  38%, 70% {
    transform: translateX(20px);
  }
  90%, 100% {
    transform: translateX(0);
  }
}

@keyframes reader-bar {
  0%, 25% {
    background: var(--reader-bar);
  }
  38%, 70% {
    background: var(--reader-bar-active);
  }
  90%, 100% {
    background: var(--reader-bar);
  }
}

@keyframes reader-placeholder {
  0%, 20% {
    transform: scale(0.9);
  }
  38%, 80% {
    transform: scale(1);
  }
  90%, 100% {
    transform: scale(0.9);
  }
}
</style>