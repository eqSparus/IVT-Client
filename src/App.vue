<template>
  <component :is="layout" v-if="layout">
    <router-view>

    </router-view>
  </component>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRoute } from 'vue-router';
import MainLayout from './pages/layout/MainLayout.vue';
import AuthenticationLayout from './pages/layout/AuthenticationLayout.vue';

export default defineComponent({
  name: 'App',
  components: { MainLayout, AuthenticationLayout },
  setup() {
    const route = useRoute();

    return {
      layout: computed(() => `${route.meta.layout}-layout`),
    };
  },
});
</script>

<style lang="scss">

</style>
