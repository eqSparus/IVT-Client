<template>
  <div>
    <the-header />
    <slot></slot>
  </div>
</template>

<script lang="ts">

import TheHeader from '@/components/TheHeader.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  components: { TheHeader },
  name: 'MainLayout',
});
</script>

<style lang="scss" scoped>

</style>
