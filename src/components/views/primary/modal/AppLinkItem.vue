<template>
  <div>
    <span class="field-fail" v-if="validate.href.$invalid && validate.href.$dirty">
      Поле не должно быть пустым и должно являться url адресом
    </span>
    <div class="item-container">

      <app-select-img :options="links"
                      :select="{img:editLink.icon, value:editLink.icon}"
                      @changeIcon="editLink.icon = $event"/>

      <input type="text"
             placeholder="Введите ссылку"
             aria-label="Введите ссылку"
             v-model="editLink.href"
             @blur="validate.href.$touch()"
             class="field-standard"/>

      <button @click="$emit('updateLink', link, editLink)"
              :disabled="validate.href.$invalid"
              class="btn-standard-icon btn-position">
        <img :src="refreshIcon"
             class="icon-trashcan"
             alt="assets/images/icon/refresh.svg">
      </button>

      <button @click="$emit('deleteLink', editLink.id)"
              class="btn-warning-icon btn-position">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>

    </div>
  </div>

</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import AppSelectImg, { SelectOption } from '@/components/UI/AppSelectImg.vue';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import { Link } from '@/types/SiteContentTypes';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export default defineComponent({
  icon: 'AppLinkItem',
  components: { AppSelectImg },
  emits: ['deleteLink', 'updateLink'],
  props: {
    link: {
      type: Object as PropType<Link>,
      required: true,
    },
    links: {
      type: Array as PropType<Array<SelectOption>>,
      required: true,
    },
  },
  setup(props) {
    const editLink = ref<Link>({
      id: props.link.id,
      href: props.link.href,
      icon: props.link.icon,
    });

    const rules = {
      href: {
        required,
        url,
      },
    };

    const validate = useVuelidate(rules, editLink.value);

    return {
      validate,
      editLink,
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
