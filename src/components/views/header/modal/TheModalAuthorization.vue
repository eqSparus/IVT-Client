<template>
  <app-modal-window :is-show="isShow"
                    @close="close"
                    :title="modalTitle">

    <app-list-alert :time="3000"
                    :alerts="alerts"
                    @deleteAlert="alerts.splice(0, 1)"/>

    <div class="modal-container">
      <the-login v-if="!isRecoverPassword"
                 @access="close"
                 @fail="alerts.push({ type: 'warning', message: 'Не верная почта или пароль' })"/>
      <the-recover-password v-else
                            @access="alerts.push({ type: 'info', message: 'Проверьте почту' })"
                            @fail="alerts.push({ type: 'warning', message: 'Неверный адрес электронной почты' })"/>
      <div class="forgot-block mt-10">
        <input type="button"
               class="forgot-password"
               @click="isRecoverPassword = !isRecoverPassword"
               :value="textChangeBtn"/>
      </div>
    </div>
  </app-modal-window>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import AppModalWindow from '@/components/UI/AppBaseModal.vue';
import TheLogin from '@/components/views/header/modal/TheLogin.vue';
import TheRecoverPassword from '@/components/views/header/modal/TheRecoverPassword.vue';
import AppListAlert, { AlertMessage } from '@/components/UI/AppListAlert.vue';

export default defineComponent({
  icon: 'TheModalAuthorization',
  components: {
    AppListAlert,
    TheRecoverPassword,
    TheLogin,
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
    const isRecoverPassword = ref<boolean>(false);
    const alerts = ref<Array<AlertMessage>>([]);

    const close = () => {
      isRecoverPassword.value = false;
      alerts.value.splice(0, alerts.value.length);
      context.emit('close');
    };

    return {
      isRecoverPassword,
      alerts,
      close,
      modalTitle: computed(() => (isRecoverPassword.value ? 'Восстановления пароля' : 'Авторизация')),
      textChangeBtn: computed(() => (isRecoverPassword.value ? 'Вернуться' : 'Забыли пароль?')),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;

.modal-container {
  display: flex;
  flex-flow: column;
  width: 420px;

  .forgot-block {
    text-align: center;

    .forgot-password {
      background: none;
      border: none;
      color: props.$info-color;
      font-size: 2rem;
      text-decoration: props.$info-color 2px underline;

      &:hover {
        $color-hover: adjust-color($color: nth(props.$info-color, 1), $red: 37, $green: 26, $blue: -2);;
        cursor: pointer;
        color: $color-hover;
        text-decoration: $color-hover 2px underline;
      }
    }
  }
}

</style>
