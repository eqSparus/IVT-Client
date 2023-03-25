<template>
  <app-modal-window :is-show="isShow"
                    @close="close"
                    :title="modalTitle">

    <app-message-alert :message="alertMessage"
                       :type="alertTypeMessage"
                       @vanish="alertMessage = ''"
                       :timeout="3000"/>

    <div class="modal-container">
      <the-login v-if="!isRecoverPassword"
                 @access="close"
                 @fail="messageWarning('Не верная почта или пароль')"/>
      <the-recover-password v-else
                            @access="messageInfo('Проверьте почту')"
                            @fail="messageWarning('Неверный адрес электронной почты')"/>
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
import AppMessageAlert, { AlertType } from '@/components/UI/AppMessageAlert.vue';
import TheLogin from '@/components/views/header/modal/TheLogin.vue';
import TheRecoverPassword from '@/components/views/header/modal/TheRecoverPassword.vue';

export default defineComponent({
  icon: 'TheModalAuthorization',
  components: {
    TheRecoverPassword,
    TheLogin,
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
    const isRecoverPassword = ref<boolean>(false);
    const alertMessage = ref<string>('');
    const alertTypeMessage = ref<AlertType>('info');

    const messageInfo = (m: string) => {
      alertTypeMessage.value = 'info';
      alertMessage.value = m;
    };

    const messageWarning = (m: string) => {
      alertTypeMessage.value = 'warning';
      alertMessage.value = m;
    };

    const close = () => {
      isRecoverPassword.value = false;
      alertMessage.value = '';
      context.emit('close');
    };

    return {
      isRecoverPassword,
      alertMessage,
      alertTypeMessage,
      close,
      messageInfo,
      messageWarning,
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
