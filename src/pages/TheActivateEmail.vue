<template>
  <div class="activate-email-container">
    <div class="spinner-loader">
      <div class="spin-w spinner-loader">
        <div class="spin-b spinner-loader">
          <div class="spin-r">

          </div>
        </div>
      </div>
    </div>
    <p class="fs-32 mt-20">Пожалуйста подождите идет активация почты...</p>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import { requestEditEmail } from '@/api/user/AuthUserApi';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
  icon: 'TheActivateEmail',
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { token } = route.query;

    onMounted(async () => {
      await requestEditEmail(token as string);
      await router.push('/main');
    });
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

$while: #FFFFFF;
$blue: #0039A6;
$red: #D52B1E;

.activate-email-container {
  width: 100%;
  height: 100vh;
  background: prop.$base-screen-main-background-color;
  display: flex;
  flex-flow: column;
  align-items: center;
  justify-content: center;

  p {
    @include utils.fontStyle(prop.$info-color, 500)
  }

  .spinner-loader {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .spin-w {
    width: 20vw;
    height: 20vw;
    border: 8px solid;
    border-color: transparent $while transparent $while;
    border-radius: 50%;
    animation: spinner 5s linear infinite;
  }

  .spin-b {
    width: 90%;
    height: 90%;
    border: 8px solid;
    border-color: $blue transparent $blue transparent;
    border-radius: 50%;
    animation: spinner 5s linear infinite;
  }

  .spin-r {
    width: 90%;
    height: 90%;
    border: 8px solid;
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
}

</style>
