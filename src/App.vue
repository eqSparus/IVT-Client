<template>
  <the-main-page/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import TheMainPage from '@/components/TheMainPage.vue';

export default defineComponent({
  components: { TheMainPage },
  name: 'App',
});
</script>

<style lang="scss">

</style>
