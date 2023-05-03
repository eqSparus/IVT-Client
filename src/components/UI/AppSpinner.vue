<template>
  <div class="spinner-loader-component position-component">
    <div class="spin-w position-component">
      <div class="spin-b position-component">
        <div class="spin-r"/>
      </div>
    </div>
    <p v-if="title" class="text-loader fs-32 mt-20"> {{ title }} </p>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'AppSpinner',
  props: {
    title: {
      type: String,
      default: '',
    },
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

$while: #FFFFFF;
$blue: #0039A6;
$red: #D52B1E;

.spinner-loader-component {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
}

.position-component {
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;
}

.text-loader {
  @include utils.font-style(prop.$primary-color, 500)
}

.spin-w {
  width: 20vw;
  height: 20vw;
  border: 0.8rem solid;
  border-color: transparent $while transparent $while;
  border-radius: 50%;
  animation: spinner 5s linear infinite;
}

.spin-b {
  width: 90%;
  height: 90%;
  border: 0.8rem solid;
  border-color: $blue transparent $blue transparent;
  border-radius: 50%;
  animation: spinner 5s linear infinite;
}

.spin-r {
  width: 90%;
  height: 90%;
  border: 0.8rem solid;
  border-color: transparent $red transparent $red;
  border-radius: 50%;
  animation: spinner 5s linear infinite;
}

@keyframes spinner {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
