<template>
  <app-base-modal :is-show="isShow"
                  title="Настройки пользователя"
                  @close="closeModal"
                  :is-footer="true">

    <div class="account-setting-container">

      <div class="setting-email">

        <app-base-field id="email"
                        label="Новая почта"
                        :fails="[{
                          isShow: valid.email.$invalid && valid.email.$dirty,
                          description: 'Поле не должно быть пустым и являться адресом эл. почты',
                        }]">
          <input type="email"
                 class="field-standard"
                 placeholder="Введите новую почту"
                 v-model="email"
                 id="email"
                 @blur="valid.email.$touch()"
                 @keyup.enter="changeEmail"/>
        </app-base-field>

        <input type="button"
               class="btn-standard mt-20"
               @click="changeEmail"
               :disabled="valid.email.$invalid"
               value="обновить адрес">
      </div>

      <div class="setting-password">
        <app-base-field id="password"
                        label="Новый пароль"
                        :fails="[
                        {
                          isShow: (valid.password.minLength.$invalid || valid.password.maxLength.$invalid) && valid.password.$dirty,
                          description: 'Пароль должен быть в пределах от 12 до 64 символов',
                        },
                        {
                          isShow: valid.password.required.$invalid && valid.password.$dirty,
                          description: 'Поле не должны быть пустыми',
                        }
                        ]">
          <input type="password"
                 class="field-standard"
                 id="password"
                 @keyup.enter="changePassword"
                 placeholder="Введите новый пароль"
                 @blur="valid.password.$touch()"
                 v-model="password"/>
        </app-base-field>

        <app-base-field id="repeatPassword"
                        class="mt-10"
                        label="Повторите новый пароль"
                        :fails="[{
                          isShow: valid.repeatPassword.$invalid && valid.repeatPassword.$dirty,
                          description: 'Поле не должны быть пустыми',
                        }]">
          <input type="password"
                 class="field-standard"
                 id="repeatPassword"
                 @keyup.enter="changePassword"
                 placeholder="Повторите новый пароль"
                 @blur="valid.repeatPassword.$touch()"
                 v-model="repeatPassword"/>
        </app-base-field>

        <input type="button"
               class="btn-standard mt-20"
               @click="changePassword"
               :disabled="valid.password.required.$invalid || valid.password.minLength.$invalid
               || valid.password.maxLength.$invalid || valid.repeatPassword.$invalid"
               value="обновить пароль">
      </div>
    </div>
  </app-base-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';
import useCredentials from '@/hooks/useCredentials';
import { requestEditPassword, requestSendEditEmail } from '@/http/user/HttpAdmin';
import useAlerts from '@/hooks/useAlerts';
import AppBaseField from '@/components/UI/AppBaseField.vue';

export default defineComponent({
  icon: 'TheModalSettingAccount',
  components: {
    AppBaseField,
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
    const { alerts } = useAlerts();

    const {
      email,
      password,
      repeatPassword,
      valid,
    } = useCredentials();

    const changePassword = async () => {
      if (!valid.value.password.samePassword.$invalid) {
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
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Пароли должны совпадать',
        });
        repeatPassword.value = '';
      }
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
@use '@/assets/scss/utils.scss';

.account-setting-container {
  display: flex;
  flex-flow: column;
  gap: 2rem;
  width: 75rem;

  .fail-message {
    text-align: center;
    @include utils.font-style(prop.$warning-color, 500);
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
