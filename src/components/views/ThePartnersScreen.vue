<template>
  <app-base-screen title="Партнёры" :is-second="true">
    <div class="partners-container">
      <img :src="iss" alt="assets/images/partners/coreDataNet.png">
      <img :src="zigma" alt="assets/images/partners/iss.png">
      <img :src="coreDataNew" alt="assets/images/partners/zigma.png">
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import coreDataNew from '@/assets/images/partners/coreDataNet.png';
import iss from '@/assets/images/partners/iss.png';
import zigma from '@/assets/images/partners/zigma.png';

export default defineComponent({
  name: 'ThePartnersScreen',
  components: { AppBaseScreen },
  setup() {
    return {
      coreDataNew,
      iss,
      zigma,
    };
  },
});
</script>

<style lang="scss" scoped>

.partners-container {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
}

</style>
