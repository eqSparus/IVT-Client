<template>
  <app-modal-window :is-show="isShow"
                    title="Настройки"
                    @close="closeModal"
                    :is-footer="true">

    <app-message-alert :message="messageAlert"
                       :type="messageType"
                       :timeout="3000"
                       @vanish="messageAlert = ''"/>

    <div class="account-setting-container">

      <div class="setting-email">

        <label class="field-label mb-10" for="email">Введите новую почту</label>
        <span v-if="valid.isEmail" class="field-fail">
          *Поле не должно быть пустым и являться адресом эл. почты
        </span>
        <input type="email"
               class="field-standard"
               placeholder="Адрес эл. почты"
               v-model="email"
               id="email"
               @blur="validate.email.$touch()"
               @keyup.enter="changeEmail"
               aria-label="Эл. почта аккаунта"/>

        <input type="button"
               class="btn-standard mt-20"
               @click="changeEmail"
               :disabled="valid.isDisableBtnEmail"
               value="ОБНОВИТЬ АДРЕС">

      </div>

      <div class="setting-password">

        <div class="fail-message fs-18 mt-10"
             v-if="valid.isPasswordSame">
          Пароли должны совпадать
        </div>

        <label class="field-label mt-10 mb-10" for="password">Введите новый пароль</label>
        <span v-if="valid.isPasswordLength"
              class="field-fail">*Пароль должен быть в пределах от 12 до 64 символов</span>
        <span v-if="valid.isPasswordRequired" class="field-fail">*Поле не должны быть пустыми</span>
        <input type="password"
               class="field-standard"
               id="password"
               @keyup.enter="changePassword"
               placeholder="Введите новый пароль"
               @blur="validate.password.$touch()"
               v-model="password"/>

        <label class="field-label mt-20 mb-10" for="repeatPassword">Повторите новый пароль</label>
        <span v-if="valid.isRepeatPasswordRequired" class="field-fail">*Поле не должны быть пустыми</span>
        <input type="password"
               class="field-standard"
               id="repeatPassword"
               @keyup.enter="changePassword"
               placeholder="Повторите пароль"
               @blur="validate.repeatPassword.$touch()"
               v-model="repeatPassword"/>

        <input type="button"
               class="btn-standard mt-20"
               @click="changePassword"
               :disabled="valid.isDisableBtnPassword"
               value="ОБНОВИТЬ ПАРОЛЬ">

      </div>

    </div>

  </app-modal-window>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import useChangePassword from '@/hooks/useChangePassword';
import AppMessageAlert, { AlertType } from '@/components/UI/AppMessageAlert.vue';
import { changePassword as passwordChange, sendChangeEmail } from '@/api/user/AuthUserApi';

export default defineComponent({
  icon: 'TheModalSettingAccount',
  components: {
    AppMessageAlert,
    AppModalWindow,
  },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  setup(prop, context) {
    const messageType = ref<AlertType>('info');
    const messageAlert = ref<string>('');

    const {
      email,
      password,
      repeatPassword,
      validate,
      valid,
    } = useChangePassword();

    const changePassword = async () => {
      try {
        await passwordChange(password.value);
        messageType.value = 'info';
        messageAlert.value = 'Смена пароля прошла успешно!';
      } catch (e) {
        messageType.value = 'warning';
        messageAlert.value = 'Смена пароля не удалась!';
      }
      password.value = '';
      repeatPassword.value = '';
      validate.value.$reset();
    };

    const changeEmail = async () => {
      try {
        await sendChangeEmail(email.value);
        messageType.value = 'info';
        messageAlert.value = 'Проверьте почту!';
      } catch (e) {
        messageType.value = 'warning';
        messageAlert.value = 'Смена почты не удалась!';
      }
      email.value = '';
      validate.value.$reset();
    };

    const closeModal = () => {
      password.value = '';
      repeatPassword.value = '';
      email.value = '';
      messageAlert.value = '';
      validate.value.$reset();
      context.emit('close');
    };

    return {
      email,
      password,
      repeatPassword,
      validate,
      messageType,
      messageAlert,
      valid,
      changePassword,
      changeEmail,
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss' as utils;

.account-setting-container {
  display: flex;
  flex-flow: column;
  gap: 20px;
  width: 700px;

  .fail-message {
    text-align: center;
    @include utils.fontStyle(prop.$warning-color, 500);
  }

  .setting-email {
    display: flex;
    flex-flow: column;
  }

  .setting-password {
    display: flex;
    flex-flow: column;
  }
}

</style>
