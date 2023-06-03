<template>
  <app-modal-window :is-show="isShow"
                    @close="close"
                    :is-focus="true"
                    :title="modalTitle">

    <div class="modal-authentication-container">
      <the-login v-if="!isRecoverPassword" @login="close"/>
      <the-recover-password v-else/>
      <div class="forgot-block mt-10">
        <input type="button"
               class="forgot-password fs-20"
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

export default defineComponent({
  icon: 'TheModalAuthorization',
  components: {
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

    const close = () => {
      isRecoverPassword.value = false;
      context.emit('close');
    };

    return {
      isRecoverPassword,
      close,
      modalTitle: computed(() => (isRecoverPassword.value ? 'Восстановления пароля' : 'Авторизация')),
      textChangeBtn: computed(() => (isRecoverPassword.value ? 'Вернуться' : 'Забыли пароль?')),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;

.modal-authentication-container {
  display: flex;
  flex-flow: column;
  width: 42rem;

  .forgot-block {
    text-align: center;

    .forgot-password {
      background: none;
      border: none;
      color: props.$primary-color;
      text-decoration: props.$primary-color 0.2rem underline;

      &:hover {
        $color-hover: adjust-color($color: nth(props.$primary-color, 1), $red: 37, $green: 26, $blue: -2);
        cursor: pointer;
        color: $color-hover;
        text-decoration: $color-hover 0.2rem underline;
      }

      &:focus {
        outline: none;
        $color-hover: adjust-color($color: nth(props.$primary-color, 1), $red: 37, $green: 26, $blue: -2);
        color: $color-hover;
        text-decoration: $color-hover 0.2rem underline;
      }
    }
  }
}

</style>
