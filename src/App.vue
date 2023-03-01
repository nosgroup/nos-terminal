<template>
  <div class="nos-terminal">
    <div class="header">
      <svg version="1.1" xmlns="http://www.w3.org/2000/svg"
           xmlns:xlink="http://www.w3.org/1999/xlink"
           class="" x="0px" y="0px" viewBox="0 0 300 300" xml:space="preserve" data-v-51ca8519=""><g data-v-51ca8519=""><path class="st0" d="M272.84,91.94c43.32,52.06,33.79,135.11-21.3,175.51c-55.1,40.39-134.89,30.92-178.23-21.12
					c-4.29-5.16-8.07-10.54-11.33-16.1c45,39.24,114.69,43.31,164.33,6.92s62.3-108.94,32.64-159.41
					C263.91,82.05,268.56,86.78,272.84,91.94" data-v-51ca8519=""></path><path class="st0" d="M112.92,291.32c-67.72-1.5-118.09-56.61-112.5-123.08C5.99,101.76,65.41,49.11,133.12,50.6
					c6.72,0.15,13.26,0.83,19.58,1.98C93.58,60.54,44.86,109.23,39.84,169.11s35.35,110.55,92.92,121.09
					C126.26,291.07,119.63,291.47,112.92,291.32" data-v-51ca8519=""></path><path class="st0" d="M42.9,66.4C75.87,9.1,149.23-8.2,206.75,27.75c57.51,35.96,77.39,111.56,44.43,168.85
					c-3.28,5.68-6.94,10.96-10.95,15.84c20.41-54.38-0.86-118.95-52.69-151.34C135.73,28.69,71.06,39.53,34.64,83.9
					C36.89,77.94,39.63,72.08,42.9,66.4" data-v-51ca8519=""></path></g></svg>
      <div class="warnings">
        <div class="network" v-if="this.warnings.wifi">
          <i class="bi bi-wifi-off" @click="this.warnings.wifiClicked = true"></i>
        </div>
        <div class="network" v-if="this.warnings.erp">
          <i class="bi bi-link-45deg" @click="this.warnings.erpClicked = true"></i>
        </div>
        <div class="update" v-if="this.warnings.update">
          <i class="bi bi-code-slash" @click="this.warnings.updateClicked = true"></i>
        </div>
        <div class="download" v-if="this.warnings.downloading">
          <i class="bi bi-download"></i>
        </div>
      </div>
    </div>
    <terminal-alert v-if="this.warnings.wifiClicked" @close="this.warnings.wifiClicked = false">
      <warnings-wifi>

      </warnings-wifi>
    </terminal-alert>
    <terminal-alert v-if="this.warnings.erpClicked" @close="this.warnings.erpClicked = false">

    </terminal-alert>
    <terminal-alert v-if="this.warnings.updateClicked" @close="this.warnings.updateClicked = false" :time="30">
      <warnings-update>

      </warnings-update>
    </terminal-alert>
    <div class="body" style="margin-top: 0" v-if="!checkingUpdates">
      <router-view>

      </router-view>
    </div>
    <div class="body updater" style="margin-top: 0" v-if="checkingUpdates">
      <div class="update-available" v-if="updateAvailable">
        <div class="updater-title">
          Ein Update wurde gefunden! <span>v1.0.1</span>
        </div>
        <div class="updater-description">
          Eine neue Version des NosTerminals wird heruntergeladen...
        </div>

        <div class="progress-info">
          <div class="info">
            <div class="percent">
              {{ downloadSpeed }}
            </div>
            <div class="speed">
              87%
            </div>
          </div>
          <div class="progress-bar">
            <div class="progress"></div>
          </div>
        </div>

      </div>
      <div class="search-updates" v-else>
        Suchen...
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/style/default.css';
import WarningsUpdate from "@/layouts/alert/warnings-update";
import TerminalAlert from "@/components/terminal-alert";
import WarningsWifi from "@/layouts/alert/warnings-wifi";

const {ipcRenderer} = require("electron");

export default {
  name: 'App',
  components: {WarningsWifi, TerminalAlert, WarningsUpdate},
  data() {
    return {
      warnings: {
        wifi: false,
        wifiClicked: false,
        erp: false,
        erpClicked: false,
        update: false,
        updateClicked: false,
        downloading: false,
      },
      updateAvailable: false,
      checkingUpdates: false,
      downloadSpeed: 0,
    }
  },
  mounted() {
    this.initTerminal();
    //this.validateUpdater();
  },
  methods: {
    validateUpdater() {
      ipcRenderer.on("checking-for-updates", () => {
        this.checkingUpdates = true;
      });

      ipcRenderer.on("update-available", () => {
        this.updateAvailable = true;

        ipcRenderer.on('download-progress', (progress) => {
          this.warnings.downloading = true;
          this.downloadSpeed = `${progress.bytesPerSecond / 1024.0 / 1024.0} MB/s `;
        });
      });

      ipcRenderer.on("update-not-available", () => {
        this.updateAvailable = false;
        this.initTerminal();
      });
    },
    initTerminal() {
      this.checkingUpdates = false;
      this.updateAvailable = false;
      this.warnings.downloading = false;

      setTimeout(() => {
        this.warnings.erp = false;
        this.warnings.wifi = !navigator.onLine;
        this.$router.push('/');
      }, 2000);

      setInterval(() => {
        this.warnings.wifi = !navigator.onLine;
      }, 1000 * 30);
    }
  }
}
</script>

<style scoped>
div.nos-terminal {
  position: absolute;
  right: 0;
  left: 0;
  bottom: 0;
  top: 0;
  background: #000000;
}

div.header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
}

div.header svg {
  fill: #cccccc;
  height: 3rem;
}

div.body {
  width: 100vw;
  display: flex;
  justify-content: center;
}

div.updater {
  color: white;
  margin-top: 4rem !important;
}

div.updater-title {
  font-size: 2.2rem;
  margin-bottom: 5rem;
}

div.updater-title span {
  font-size: 1.5rem;
}

div.updater-description {
  font-size: 16px;
  margin-bottom: 1rem;
}

div.progress-info {
  display: flex;
  flex-direction: column;
  gap: .5rem;
}

.info {
  display: flex;
  justify-content: space-between;
  font-size: 16px;
}

div.update-available div.progress-bar {
  height: 8px;
  background: var(--border-color);
  border-radius: 8px;
  width: 80vw;
  position: relative;
}

div.progress {
  height: 8px;
  position: absolute;
  left: 0;
  top: 0;
  width: 200px;
  background: var(--primary);
  border-radius: 8px;
}

div.warnings {
  color: #ff0000;
  display: flex;
  gap: .8rem;
}

div.warnings .update {
  color: var(--primary);
}

div.warnings .download {
  color: white;
  animation: fade 2s infinite;
}

@keyframes fade {
  0% {
    color: black;
  }

  100% {
    color: white;
  }
}

</style>
