<template>
  <div class="settings-overview">
    <div class="where-am-i">
      <div class="path">Einstellungen <span v-if="path['path_name'] !== 'settings'">/</span> {{ path['name'] }}
      </div>
      <div class="back">
        <i class="bi bi-x-lg" v-if="path['path_name'] === 'settings'" @click="this.$router.push('/')"/>
        <i class="bi bi-arrow-return-left" @click="path = {name: '', path_name: 'settings'}" v-else/>
      </div>
    </div>
    <div class="setting-view">
      <div class="single-view" v-if="path['path_name'] === 'settings'">
        <div class="settings">
          <div class="setting" v-for="(setting, index) in settings" :key="index" @click="path = {name: setting.name, path_name: setting.path.path_name}">
            <div class="icon">
              <i :class="setting.icon"/>
            </div>
            <div class="title">
              {{ setting.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="single-view" v-if="path['path_name'] === 'settings>erp'">
        <settings-erp :adminRFID="getCardRFID()">
          <!-- TEMPLATE -->
        </settings-erp>
      </div>
      <div class="single-view" v-if="path['path_name'] === 'settings>register'">
        <settings-register :adminRFID="getCardRFID()">
          <!-- TEMPLATE -->
        </settings-register>
      </div>
      <div class="single-view" v-if="path['path_name'] === 'settings>deregister'">
        <settings-deregister :adminRFID="getCardRFID()" @new="switchToNew()">
          <!-- TEMPLATE -->
        </settings-deregister>
      </div>
    </div>
  </div>
</template>

<script>
import SettingsErp from "@/pages/configured/settings/category/settings-erp";
import SettingsRegister from "@/pages/configured/settings/category/settings-register";
import SettingsDeregister from "@/pages/configured/settings/category/settings-unregister";

export default {
  name: "settings-screen",
  components: {SettingsDeregister, SettingsRegister, SettingsErp},
  data() {
    return {
      path: {
        name: '',
        path_name: 'settings',
      },
      settings: [
        {
          name: 'ERP-Verbindung',
          path: {
            path_name: 'settings>erp'
          },
          icon: 'bi bi-link-45deg',
        },
        {
          name: 'Chip registrieren',
          path: {
            path_name: 'settings>register'
          },
          icon: 'bi bi-person-plus',
        },
        {
          name: 'Chip entfernen',
          path: {
            path_name: 'settings>deregister'
          },
          icon: 'bi bi-person-dash',
        }
      ],
    }
  },
  methods: {
    getCardRFID() {
      return this.$route.params.card;
    },
    switchToNew() {
      let setting = this.settings.find(setting => setting.path.path_name === 'settings>register');
      this.path = {name: setting.name, path_name: setting.path.path_name};
    }
  }
}
</script>

<style scoped>
div.settings-overview {
  margin-top: 1rem;
}

div.settings-overview .where-am-i {
  width: 80vw;
  padding: .5rem 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--border-color);
  font-size: 2.2rem;
}

div.settings {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

div.setting {
  width: calc(33.3333333% - .5rem);
  background: var(--primary);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  height: 120px;
}

div.settings i {
  font-size: 3rem;
}

div.settings .title {
  text-align: center;
}


</style>
<style>
div.setting-page {
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
}

div.option {
  width: 100%;
  margin: .5rem 0;
}

div.option span {
  font-weight: bold;
}
</style>