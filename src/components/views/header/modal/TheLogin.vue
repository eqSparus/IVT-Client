<template>
  <form class="login-container">
    <label class="field-label mt-10" for="email">Введите электронную почту</label>
    <input class="field-standard mt-10"
           type="email"
           id="email"
           v-model="email"
           aria-label="Введите электронную почту"
           placeholder="Электронная почта"
           @keyup.enter="login"/>

    <label class="field-label mt-10" for="password">Введите пароль</label>
    <input class="field-standard mt-10"
           type="password"
           id="password"
           v-model="password"
           placeholder="Пароль"
           @keyup.enter="login"/>

    <input type="button"
           class="btn-standard mt-30"
           value="войти"
           @click="login"/>
  </form>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TheLogin',
  emits: ['access', 'fail'],
  setup(props, { emit }) {
    const store = useStore();
    const email = ref<string>('');
    const password = ref<string>('');

    const login = async () => {
      try {
        await store.dispatch('auth/login', {
          email: email.value,
          password: password.value,
        });
        email.value = '';
        password.value = '';
        emit('access');
      } catch (e) {
        emit('fail');
      }
    };

    return {
      email,
      password,
      login,
    };
  },
});
</script>

<style lang="scss" scoped>
.login-container {
  display: flex;
  flex-flow: column;
}
</style>
