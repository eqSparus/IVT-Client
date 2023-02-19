<template>
  <app-modal-window :is-show="isShow"
                    title="Редактирование аккаунта"
                    @close="$emit('close')"
                    :is-footer="true">

    <div class="account-setting-container">

      <div class="setting-email">

        <input type="email"
               class="field-standard"
               placeholder="Адрес эл. почты"
               aria-label="Эл. почта аккаунта"/>

        <input type="button"
               class="btn-standard mt-20"
               value="ОБНОВИТЬ АДРЕС">

      </div>

      <div class="setting-password">

        <input type="email"
               class="field-standard"
               placeholder="Введите новый пароль"
               aria-label="Введите новый пароль"/>

        <input type="email"
               class="field-standard mt-10"
               placeholder="Повторите пароль"
               aria-label="Повторите пароль"/>

        <input type="button" class="btn-standard mt-20" value="ОБНОВИТЬ ПАРОЛЬ">

      </div>

    </div>

  </app-modal-window>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';

export default defineComponent({
  name: 'TheModalSettingAccount',
  components: { AppModalWindow },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
});
</script>

<style lang="scss" scoped>

.account-setting-container {
  display: flex;
  flex-flow: row;
  gap: 20px;
  width: 40vw;
  align-items: flex-end;

  .setting-email {
    width: 50%;
    display: flex;
    flex-flow: column;
  }

  .setting-password {
    width: 50%;
    display: flex;
    flex-flow: column;
  }
}

</style>
