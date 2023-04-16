<template>
  <form class="login-container">
    <app-base-field id="email"
                    class="mt-10"
                    label="Электронную почту">
      <input class="field-standard"
             type="email"
             id="email"
             v-model="email"
             aria-label="Введите электронную почту"
             placeholder="Электронная почта"
             @keyup.enter="login"/>
    </app-base-field>

    <app-base-field id="password"
                    class="mt-10"
                    label="Пароль">
      <input class="field-standard"
             type="password"
             id="password"
             v-model="password"
             placeholder="Пароль"
             @keyup.enter="login"/>
    </app-base-field>

    <input type="button"
           class="btn-standard mt-30"
           value="войти"
           @click="login"/>
  </form>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { useStore } from 'vuex';
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  name: 'TheLogin',
  components: { AppBaseField },
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
        email.value = '';
        password.value = '';
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
