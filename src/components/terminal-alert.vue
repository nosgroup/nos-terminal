<template>
  <div class="terminal-alert">
    <div class="alert-box">
      <div class="head">
        <div class="title">
          {{ title || '' }}
        </div>
        <div class="close">
          <i class="bi bi-x-lg" @click="this.$emit('close')"/>
        </div>
      </div>
      <div class="content">
        <slot>

        </slot>
      </div>
      <div class="progress-bar">
        <div class="progress" :class="{low: this.getCloseIn !== null}"
             :style="{'animation-duration' : getAnimationDuration()}"/>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "terminal-alert",
  props: ['title', 'time'],
  data() {
    return {
      closeIn: null,
    }
  },
  computed: {
    getCloseIn() {
      return this.closeIn;
    }
  },
  methods: {
    getAnimationDuration() {
      return this.getCloseIn !== undefined ? `${this.getCloseIn}s` : 'unset';
    },
    setProgressValue() {
      this.closeIn = this.time === undefined || typeof this.time !== 'number' ? 5 : this.time;
      setTimeout(() => {
        this.$emit('close');
      }, this.closeIn * 1000);
    }
  },
  mounted() {
    this.setProgressValue();
  }
}
</script>

<style scoped>
div.terminal-alert {
  position: absolute;
  height: 100vh;
  width: 100vw;
  top: 0;
  left: 0;
  z-index: 200;
  display: flex;
  justify-content: center;
  background: #30303090;
}

div.terminal-alert .alert-box {
  margin-top: 40px;
  padding: 1rem;
  width: 60vw;
  height: 65vh;
  background: #666;
  border-radius: .6rem;
}

.alert-box .head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.head .title {
  font-weight: bold;
  font-size: 1.2rem;
  color: #acacac;
}

div.content {
  height: 300px;
  margin: 2rem;
  margin-top: .5rem;
}

div.progress-bar {
  margin: 1rem 0;
  width: 100%;
  height: .5rem;
  border-radius: 5px;
  background: #acacac;
}

div.progress-bar .progress {
  background: #6257ed;
  height: .5rem;
  border-radius: 5px;
  animation-name: goLow;

}

@keyframes goLow {
  0% {
    width: 100%;
  }

  100% {
    width: 0;
  }
}

</style>

<style>
.alert-description {
  text-align: center;
  margin-bottom: 1rem;
}

.alert-description span{
  font-weight: bold;
}
</style>