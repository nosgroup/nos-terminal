<template>
  <div class="staff-card">
    <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg"
         xmlns:xlink="http://www.w3.org/1999/xlink"
         class="logo" x="0px" y="0px" viewBox="0 0 300 300" xml:space="preserve" data-v-51ca8519=""><g data-v-51ca8519=""><path class="st0" d="M272.84,91.94c43.32,52.06,33.79,135.11-21.3,175.51c-55.1,40.39-134.89,30.92-178.23-21.12
					c-4.29-5.16-8.07-10.54-11.33-16.1c45,39.24,114.69,43.31,164.33,6.92s62.3-108.94,32.64-159.41
					C263.91,82.05,268.56,86.78,272.84,91.94" data-v-51ca8519=""></path><path class="st0" d="M112.92,291.32c-67.72-1.5-118.09-56.61-112.5-123.08C5.99,101.76,65.41,49.11,133.12,50.6
					c6.72,0.15,13.26,0.83,19.58,1.98C93.58,60.54,44.86,109.23,39.84,169.11s35.35,110.55,92.92,121.09
					C126.26,291.07,119.63,291.47,112.92,291.32" data-v-51ca8519=""></path><path class="st0" d="M42.9,66.4C75.87,9.1,149.23-8.2,206.75,27.75c57.51,35.96,77.39,111.56,44.43,168.85
					c-3.28,5.68-6.94,10.96-10.95,15.84c20.41-54.38-0.86-118.95-52.69-151.34C135.73,28.69,71.06,39.53,34.64,83.9
					C36.89,77.94,39.63,72.08,42.9,66.4" data-v-51ca8519=""></path></g></svg>
    <div class="staff-name">
      {{ this.name || 'Max Mustermann' }}
    </div>
    <div class="view">
      <div class="question" v-if="view === 'unknown'">?</div>
      <div class="success" v-if="view === 'success'">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" enable-background="new 0 0 32 32" id="Layer_1" version="1.0" viewBox="0 0 32 32" xml:space="preserve"><polyline class="path" fill="none" points="20,6 9,17 4,12" stroke="var(--green)" stroke-miterlimit="10" stroke-width="2"/></svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "staff-card",
  props: ['name', 'view']
}
</script>

<style scoped>
div.staff-card {
  position: relative;
  height: 150px;
  width: 240px;
  background: var(--primary);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  justify-content: space-between;
  align-items: start;
}

div.staff-card svg.logo {
  fill: #acacac;
  height: 40px;
}

div.staff-card div.staff-name {
  font-size: 1rem;
  font-weight: bold;
}

div.view {
  position: absolute;
  height: 10px;
  width: 20px;
  right: 40px;
  top: -20px;
  color: white;
  font-size: 10rem;
}

.view .question {
  animation: 1s shakeQuestion forwards;
}

@keyframes shakeQuestion {
  0% {
    transform: rotate(10deg);
  }
  80% {
    transform: rotate(-10deg);
  }
  100% {
    transform: rotate(10deg);
  }
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

div.success {
  position: absolute;
  right: -150px;
  top: -20px;
}

.success svg {
  width: 200px;
  height: 200px;
}

.path {
  stroke-linecap: round;
  stroke-dasharray: 27;
  stroke-dashoffset: -23;
  -webkit-animation: dash 500ms ease forwards;
  animation: dash 500ms ease forwards;
}

@-webkit-keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: 0;
  }
}
</style>