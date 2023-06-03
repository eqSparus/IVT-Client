<template>
  <div class="activate-email-container">
    <app-spinner title="Пожалуйста подождите идет активация почты..."/>
  </div>
</template>

<script lang="ts">

import { defineComponent, onMounted } from 'vue';
import { requestEditEmail } from '@/http/user/HttpAdmin';
import { useRoute, useRouter } from 'vue-router';
import AppSpinner from '@/components/UI/AppSpinner.vue';

export default defineComponent({
  name: 'TheActivateEmail',
  components: { AppSpinner },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const { token } = route.query;

    onMounted(async () => {
      try {
        await requestEditEmail(token as string);
        await router.replace('/main');
      } catch (e) {
        await router.replace('/main');
      }
    });
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.activate-email-container {
  width: 100%;
  height: 100vh;
  background: prop.$main-first-color;
  display: flex;
  justify-content: center;
}

</style>
