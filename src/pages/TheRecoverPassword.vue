<template>
  <div class="recover-container">
    <div class="recover-block">

      <h3 class="fs-32">Восстановить пароль</h3>

      <app-message-alert message="Вы уже восстанавливали пароль по этой ссылке или время доступа ссылки истекло"
                         type="warning"
                         :is-show="isMessage"
                         :timeout="5000"
                         @vanish="isMessage = false;"/>

      <div class="recover-content">

        <div class="fail-message fs-18 mt-10"
             v-if="valid.isPasswordSame">
          Пароли должны совпадать
        </div>

        <label class="field-label mt-20 mb-10" for="password">Введите новый пароль</label>
        <span v-if="valid.isPasswordLength"
              class="field-fail">*Пароль должен быть в пределах от 12 до 64 символов</span>
        <span v-if="valid.isPasswordRequired" class="field-fail">*Поле не должны быть пустыми</span>
        <input type="password"
               id="password"
               v-model="password"
               @blur="validate.password.$touch()"
               class="field-standard">

        <label class="field-label mt-20 mb-10" for="repeat-password">Повторите новый пароль</label>
        <span v-if="valid.isRepeatPasswordRequired" class="field-fail">*Поле не должны быть пустыми</span>
        <input type="password"
               id="repeat-password"
               v-model="repeatPassword"
               @blur="validate.repeatPassword.$touch()"
               class="field-standard">

        <input type="button"
               class="btn-standard mt-30"
               value="восстановить пароль"
               :disabled="valid.isDisableBtnPassword"
               @click="recoverPassword">
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { recoverPasswordByToken } from '@/api/user/UserApi';
import useChangePassword from '@/hooks/useChangePassword';
import AppMessageAlert from '@/components/UI/AppMessageAlert.vue';

export default defineComponent({
  icon: 'TheRecoverPassword',
  components: { AppMessageAlert },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const { token } = route.query;
    const isMessage = ref<boolean>(false);

    const {
      password,
      repeatPassword,
      validate,
      valid,
    } = useChangePassword();

    const recoverPassword = async () => {
      try {
        await recoverPasswordByToken(password.value, token as string);
        await router.push('/main');
      } catch (e) {
        password.value = '';
        repeatPassword.value = '';
        isMessage.value = true;
      }
      validate.value.$reset();
    };

    return {
      password,
      repeatPassword,
      validate,
      isMessage,
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
  background: prop.$base-screen-main-background-color;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  .recover-block {
    width: 40%;
    margin-top: 10%;
    background: prop.$modal-window-background-color;
    border-radius: 10px;
    padding: 20px 0 20px 0;
    display: flex;
    flex-flow: column;

    .fail-message {
      text-align: center;
      @include utils.fontStyle(prop.$warning-color, 500);
    }

    h3 {
      text-align: center;
      @include utils.fontStyle($weight: 400, $color: prop.$modal-window-text-color);
      border-bottom: 1px solid black;
    }

    .recover-content {
      display: flex;
      flex-flow: column;
      padding: 0 20px;
    }
  }
}

</style>
