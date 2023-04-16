<template>
  <div class="recover-container">
    <div class="recover-block">

      <h3 class="fs-32">Восстановить пароль</h3>

      <div class="recover-content">

        <app-base-field id="password"
                        class="mt-20 mb-10"
                        label="Введите новый пароль"
                        :fails="[
                          {
                            isShow: (valid.password.minLength.$invalid || valid.password.maxLength.$invalid) && valid.password.$dirty,
                            description: 'Пароль должен быть в пределах от 12 до 64 символов',
                          },
                          {
                            isShow: valid.password.required.$invalid && valid.password.$dirty,
                            description: 'Поле не должны быть пустыми',
                          },
                        ]">
          <input type="password"
                 id="password"
                 v-model="password"
                 @blur="valid.password.$touch()"
                 class="field-standard">
        </app-base-field>

        <app-base-field id="repeat-password"
                        label="Повторите новый пароль"
                        :fails="[{
                            isShow: valid.repeatPassword.$invalid && valid.repeatPassword.$dirty,
                            description: 'Поле не должны быть пустыми',
                        }]">
          <input type="password"
                 id="repeat-password"
                 v-model="repeatPassword"
                 @blur="valid.repeatPassword.$touch()"
                 class="field-standard">
        </app-base-field>

        <input type="button"
               class="btn-standard mt-30"
               value="восстановить пароль"
               :disabled="valid.password.required.$invalid || valid.password.minLength.$invalid
               || valid.password.maxLength.$invalid || valid.repeatPassword.$invalid"
               @click="recoverPassword">
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { requestRecoverPassword } from '@/api/user/UserApi';
import useChangePassword from '@/hooks/useEditAccount';
import useAlerts from '@/hooks/useAlerts';
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  components: { AppBaseField },
  icon: 'TheRecoverPasswordPage',
  setup() {
    const { alerts } = useAlerts();
    const route = useRoute();
    const router = useRouter();
    const { token } = route.query;

    const {
      password,
      repeatPassword,
      valid,
    } = useChangePassword();

    const recoverPassword = async () => {
      if (!valid.value.password.samePassword.$invalid) {
        try {
          await requestRecoverPassword(password.value, token as string);
          await router.push('/main');
        } catch (e) {
          password.value = '';
          repeatPassword.value = '';
          alerts.value.push({
            type: 'warning',
            message: 'Вы уже восстанавливали пароль по этой ссылке или время доступа ссылки истекло',
          });
        }
        valid.value.$reset();
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Пароли должны совпадать',
        });
        repeatPassword.value = '';
      }
    };

    return {
      password,
      repeatPassword,
      alerts,
      valid,
      recoverPassword,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.recover-container {
  width: 100%;
  height: 100vh;
  background: prop.$main-first-color;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .recover-block {
    width: 40%;
    margin-top: 10%;
    background: prop.$main-second-color;
    border-radius: 1rem;
    padding: 2rem 0 2rem 0;
    display: flex;
    flex-flow: column;

    h3 {
      text-align: center;
      @include utils.fontStyle($weight: 400, $color: prop.$main-first-color);
      border-bottom: 0.1rem solid black;
    }

    .recover-content {
      display: flex;
      flex-flow: column;
      padding: 0 2rem;
    }
  }
}

</style>
