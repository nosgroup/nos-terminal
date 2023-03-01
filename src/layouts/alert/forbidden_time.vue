<template>
  <div class="alert unknown-chip-alert">
    <div class="alert-description">
      Du darfst dich <not style="color: #ff0000">nicht</not>&nbsp;<br>
      <span v-if="getType() === 'early'">vor </span>
      <span v-if="getType() === 'late'">nach </span>
      <time>{{ getTime() }} Uhr</time>&nbsp;einstechen!
    </div>
    <div class="chip">
      <div class="card">
        <i class="bi bi-x-octagon" style="font-size: 140px"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "forbidden_time",
  props: ['time'],
  methods: {
    pad2Digits(number) {
      return number > 9 ? `${number}` : `0${number}`;
    },
    getType() {
      return this.time['msg'] === 'time too early' ? 'early' : 'late';
    },
    getTime() {
      let time = new Date(this.time.time * 1000);
      return `${this.pad2Digits(time.getHours())}:${this.pad2Digits(time.getMinutes())}`;
    }
  }
}
</script>

<style scoped>
div.chip {
  height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>