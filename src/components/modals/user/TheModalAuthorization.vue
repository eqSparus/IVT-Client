<template>
  <app-modal-window :is-show="isShow"
                    @close="close"
                    :title="modalTitle">

    <app-message-alert :message="message"
                       :type="typeMessage"
                       @vanish="message = ''"
                       :timeout="3000"/>

    <form class="modal-container" v-if="!isRecoverPass">

      <label class="field-label mt-10" for="email">Введите электронную почту</label>
      <input class="field-standard mt-10"
             type="email"
             id="email"
             v-model="email"
             aria-label="Введите электронную почту"
             placeholder="Электронная почта"
             @keyup.enter="loginUser"/>

      <label class="field-label mt-10" for="password">Введите пароль</label>
      <input class="field-standard mt-10"
             type="password"
             id="password"
             v-model="password"
             placeholder="Пароль"
             @keyup.enter="loginUser"/>

      <input type="button"
             class="btn-standard mt-30"
             value="войти"
             @click="loginUser"/>

      <div class="forgot-block mt-10">

        <input type="button"
               class="forgot-password"
               @click="changeWindow"
               value="Забыли пароль?"/>
      </div>
    </form>
    <div class="modal-container" v-else>
      <label class="field-label mt-10" for="recoverPassword">Введите электронную почту</label>
      <input type="email"
             class="field-standard mt-10"
             id="recoverPassword"
             v-model="recoverEmail"
             placeholder="Введите адрес почты"
             @keyup.enter="recoverPassword">

      <input type="button"
             class="btn-standard mt-30"
             value="восстановить"
             @click="recoverPassword"/>

      <div class="forgot-block mt-10">
        <input type="button"
               class="forgot-password"
               @click="changeWindow"
               value="Вернуться"/>
      </div>
    </div>

  </app-modal-window>
</template>

<script lang="ts">

import { computed, defineComponent, ref } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import { authentication, sendRecoverPasswordEmail } from '@/api/user/UserApi';
import AppMessageAlert, { AlertType } from '@/components/UI/AppMessageAlert.vue';
import { useStore } from 'vuex';

export default defineComponent({
  icon: 'TheModalAuthorization',
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
    const store = useStore();
    const isRecoverPass = ref<boolean>(false);
    const recoverEmail = ref<string>('');
    const email = ref<string>('');
    const password = ref<string>('');

    const message = ref<string>('');
    const typeMessage = ref<AlertType>('info');

    const changeWindow = () => {
      isRecoverPass.value = !isRecoverPass.value;
    };

    const recoverPassword = async () => {
      try {
        await sendRecoverPasswordEmail(recoverEmail.value);
        typeMessage.value = 'info';
        message.value = 'Проверьте почту';
      } catch (e) {
        recoverEmail.value = '';
        typeMessage.value = 'warning';
        message.value = 'Неверный адрес электронной почты';
      }
    };

    const close = () => {
      isRecoverPass.value = false;
      email.value = '';
      password.value = '';
      recoverEmail.value = '';
      message.value = '';
      context.emit('close');
    };

    const loginUser = async () => {
      try {
        const data = await authentication({
          email: email.value,
          password: password.value,
        });
        store.commit('auth/setTokens', {
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        });
        close();
      } catch (e) {
        typeMessage.value = 'warning';
        message.value = 'Не верная почта или пароль';
      }
    };

    return {
      email,
      password,
      isRecoverPass,
      recoverEmail,
      message,
      typeMessage,
      loginUser,
      close,
      changeWindow,
      recoverPassword,
      modalTitle: computed(() => (isRecoverPass.value ? 'Восстановления пароля' : 'Авторизация')),
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
