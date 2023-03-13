<template>
  <div>
    <span class="field-fail" v-if="validate.href.$invalid && validate.href.$dirty">
      Поле не должно быть пустым
    </span>
    <div class="item-container">

      <app-select-img :options="links"
                      @changeIcon="changeLink.icon = $event"
                      :select="changeLink.icon"/>

      <input type="text"
             placeholder="Введите ссылку"
             aria-label="Введите ссылку"
             v-model="changeLink.href"
             @blur="validate.href.$touch()"
             class="field-standard"/>

      <button @click="$emit('updateLink', changeLink)"
              :disabled="validate.href.$invalid"
              class="btn-standard-icon btn-position">
        <img :src="refreshIcon"
             class="icon-trashcan"
             alt="assets/images/icon/refresh.svg">
      </button>

      <button @click="$emit('deleteLink', changeLink.id)"
              class="btn-warning-icon btn-position">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>

    </div>
  </div>

</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import AppSelectImg from '@/components/UI/AppSelectImg.vue';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import { Link } from '@/api/model/ModelTypes';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  icon: 'AppDepartmentLinkItem',
  components: { AppSelectImg },
  emits: ['deleteLink', 'updateLink'],
  props: {
    link: {
      type: Object as PropType<Link>,
      required: true,
    },
    links: {
      type: Array as PropType<Array<string>>,
      required: true,
    },
  },
  setup(props) {
    const changeLink = ref<Link>({
      id: props.link.id,
      href: props.link.href,
      icon: props.link.icon,
    });

    const rules = {
      href: {
        required,
      },
    };

    const validate = useVuelidate(rules, changeLink);

    return {
      validate,
      changeLink,
      trashcanIcon,
      refreshIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;

.item-container {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  gap: 10px;

  .btn-position {
    align-self: center;
    height: 40px;
    width: 40px;
  }
}

input:nth-child(1) {
  flex: 3;
}

input:nth-child(2) {
  flex: 1;
}
</style>
