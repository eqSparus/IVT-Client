<template>
  <form class="recover-container">
    <label class="field-label mt-10" for="recoverPassword">Введите электронную почту</label>
    <input type="email"
           class="field-standard mt-10"
           id="recoverPassword"
           v-model="email"
           placeholder="Введите адрес почты"
           @keyup.enter="recoverPassword">

    <input type="button"
           class="btn-standard mt-30"
           value="восстановить"
           @click="recoverPassword"/>
  </form>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { sendRecoverPasswordEmail } from '@/api/user/UserApi';

export default defineComponent({
  name: 'TheRecoverPassword',
  emits: ['access', 'fail'],
  setup(props, { emit }) {
    const email = ref<string>('');

    const recoverPassword = async () => {
      try {
        await sendRecoverPasswordEmail(email.value);
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
