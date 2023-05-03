<template>
  <form class="recover-container">
    <app-base-field id="recoverPassword"
                    label="Электронная почта">
      <input type="email"
             class="field-standard"
             id="recoverPassword"
             v-model="email"
             placeholder="Введите электронную почту"
             @keydown.enter.prevent="recoverPassword">
    </app-base-field>

    <input type="button"
           class="btn-standard mt-30"
           value="восстановить"
           @click="recoverPassword"/>
  </form>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { requestSendRecoverPasswordEmail } from '@/api/user/UserApi';
import AppBaseField from '@/components/UI/AppBaseField.vue';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  name: 'TheRecoverPassword',
  components: { AppBaseField },
  setup() {
    const { alerts } = useAlerts();
    const email = ref<string>('');

    const recoverPassword = async () => {
      await requestSendRecoverPasswordEmail(email.value);
      alerts.value.push({
        type: 'info',
        message: 'Проверьте почту',
      });
      email.value = '';
    };

    return {
      email,
      recoverPassword,
    };
  },
});
</script>

<style lang="scss" scoped>

.recover-container {
  display: flex;
  flex-flow: column;
}

</style>
