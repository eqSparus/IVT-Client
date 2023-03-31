<template>
  <app-list-alert :time="3000"
                  :alerts="alerts"
                  @deleteAlert="deleteAlert()"/>
  <router-view>

  </router-view>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppListAlert from '@/components/UI/AppListAlert.vue';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  name: 'App',
  components: { AppListAlert },
  setup() {
    const {
      alerts,
      deleteAlert,
    } = useAlerts();

    return {
      alerts,
      deleteAlert,
    };
  },
});
</script>

<style lang="scss">

</style>
