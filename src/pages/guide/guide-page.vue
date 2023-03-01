<template>
  <div class="settings">
    <div class="head">
      <div class="headline">
        <h1>Terminal Einrichten</h1>
      </div>
      <hr>
    </div>
    <div class="content">
      <div class="option">
        <span>Tragen Sie die NOSERP-Url ein</span>
        <input type="text" placeholder="z.B. https://nosgroup.noserp.de" v-model="erpUrl">
      </div>
    </div>
    <div class="save" style="margin-top: 100px">
      <button @click="connectErp">
        Verbindung aufbauen
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "GuidePage",
  data() {
    return {
      erpUrl: '',
    }
  },
  methods: {
    connectErp() {
      localStorage.setItem("erp-url", this.erpUrl);
      this.$router.push('/');
    }
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