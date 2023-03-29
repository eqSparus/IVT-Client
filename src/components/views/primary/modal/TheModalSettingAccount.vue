<template>
  <app-base-modal :is-show="isShow"
                  title="Настройки пользователя"
                  @close="closeModal"
                  :is-footer="true">

    <app-list-alert :alerts="alerts"
                    :time="3000"
                    @deleteAlert="alerts.splice(0, 1)"/>

    <div class="account-setting-container">

      <div class="setting-email">

        <label class="field-label mb-10" for="email">Введите новую почту</label>
        <span v-if="valid.email.$invalid && valid.email.$dirty"
              class="field-fail">
          Поле не должно быть пустым и являться адресом эл. почты
        </span>
        <input type="email"
               class="field-standard"
               placeholder="Адрес эл. почты"
               v-model="email"
               id="email"
               @blur="valid.email.$touch()"
               @keyup.enter="changeEmail"
               aria-label="Эл. почта аккаунта"/>

        <input type="button"
               class="btn-standard mt-20"
               @click="changeEmail"
               :disabled="valid.email.$invalid"
               value="ОБНОВИТЬ АДРЕС">

      </div>

      <div class="setting-password">

        <div class="fail-message fs-18 mt-10"
             v-if="valid.password.samePassword.$invalid && valid.password.$dirty && valid.repeatPassword.$dirty">
          Пароли должны совпадать
        </div>

        <label class="field-label mt-10 mb-10" for="password">Введите новый пароль</label>
        <span v-if="(valid.password.minLength.$invalid || valid.password.maxLength.$invalid) && valid.password.$dirty"
              class="field-fail">
          Пароль должен быть в пределах от 12 до 64 символов
        </span>
        <span v-if="valid.password.required.$invalid && valid.password.$dirty" class="field-fail">
          Поле не должны быть пустыми
        </span>
        <input type="password"
               class="field-standard"
               id="password"
               @keyup.enter="changePassword"
               placeholder="Введите новый пароль"
               @blur="valid.password.$touch()"
               v-model="password"/>

        <label class="field-label mt-20 mb-10" for="repeatPassword">Повторите новый пароль</label>
        <span v-if="valid.repeatPassword.$invalid && valid.repeatPassword.$dirty"
              class="field-fail">
          Поле не должны быть пустыми
        </span>
        <input type="password"
               class="field-standard"
               id="repeatPassword"
               @keyup.enter="changePassword"
               placeholder="Повторите пароль"
               @blur="valid.repeatPassword.$touch()"
               v-model="repeatPassword"/>

        <input type="button"
               class="btn-standard mt-20"
               @click="changePassword"
               :disabled="valid.password.$invalid || valid.repeatPassword.$invalid"
               value="обновить пароль">

      </div>

    </div>

  </app-base-modal>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';
import useChangePassword from '@/hooks/useEditAccount';
import { requestEditPassword, requestSendEditEmail } from '@/api/user/AuthUserApi';
import AppListAlert, { AlertMessage } from '@/components/UI/AppListAlert.vue';

export default defineComponent({
  icon: 'TheModalSettingAccount',
  components: {
    AppListAlert,
    AppBaseModal,
  },
  emits: ['close'],
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  setup(prop, { emit }) {
    const alerts = ref<Array<AlertMessage>>([]);

    const {
      email,
      password,
      repeatPassword,
      valid,
    } = useChangePassword();

    const changePassword = async () => {
      try {
        await requestEditPassword(password.value);
        alerts.value.push({
          type: 'info',
          message: 'Смена пароля прошла успешно!',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Смена пароля не удалась!',
        });
      }
      password.value = '';
      repeatPassword.value = '';
      valid.value.$reset();
    };

    const changeEmail = async () => {
      try {
        await requestSendEditEmail(email.value);
        alerts.value.push({
          type: 'info',
          message: 'Проверьте почту!',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Смена почты не удалась!',
        });
      }
      email.value = '';
      valid.value.$reset();
    };

    const closeModal = () => {
      password.value = '';
      repeatPassword.value = '';
      email.value = '';
      alerts.value.splice(0, alerts.value.length);
      valid.value.$reset();
      emit('close');
    };

    return {
      email,
      password,
      repeatPassword,
      valid,
      alerts,
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
  width: 40vw;

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
