<template>
  <div class="login-container">
    <app-base-field id="email"
                    class="mt-10"
                    label="Адрес электронной почты">
      <input class="field-standard"
             type="email"
             id="email"
             v-model="email"
             placeholder="Введите адрес электронной почты"/>
    </app-base-field>

    <app-base-field id="password"
                    class="mt-10"
                    label="Пароль">
      <input class="field-standard"
             type="password"
             id="password"
             v-model="password"
             placeholder="Введите пароль"
             @keydown.enter.prevent="login"/>
    </app-base-field>

    <input type="button"
           class="btn-standard mt-30"
           value="войти"
           @click="login"/>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import AppBaseField from '@/components/UI/AppBaseField.vue';
import useAlerts from '@/hooks/useAlerts';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';
import useCredentials from '@/hooks/useCredentials';

export default defineComponent({
  name: 'TheLogin',
  components: { AppBaseField },
  emits: ['login'],
  setup(props, { emit }) {
    const { login: loginUser } = useTokenAuthentication();
    const { alerts } = useAlerts();
    const {
      email,
      password,
    } = useCredentials();

    const login = async () => {
      try {
        await loginUser({
          email: email.value,
          password: password.value,
        });
        email.value = '';
        password.value = '';
        emit('login');
      } catch (e) {
        email.value = '';
        password.value = '';
        alerts.value.push({
          type: 'warning',
          message: 'Не верная почта или пароль',
        });
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
