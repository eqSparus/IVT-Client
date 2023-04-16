<template>
  <form class="recover-container">
    <app-base-field id="recoverPassword"
                    label="Электронная почта">
      <input type="email"
             class="field-standard mt-10"
             id="recoverPassword"
             v-model="email"
             placeholder="Введите адрес почты"
             @keyup.enter="recoverPassword">
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

export default defineComponent({
  name: 'TheRecoverPassword',
  components: { AppBaseField },
  emits: ['access', 'fail'],
  setup(props, { emit }) {
    const email = ref<string>('');

    const recoverPassword = async () => {
      try {
        await requestSendRecoverPasswordEmail(email.value);
        emit('access');
      } catch (e) {
        emit('fail');
      }
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
