<template>
  <div class="item-link-container">

    <app-select-img :options="links"
                    :select="editLink.icon"
                    @changeIcon="editLink.icon = $event"/>

    <app-base-field :fails="[{
          description: 'Поле не должно быть пустым и должно являться url адресом',
          isShow: validate.href.$invalid && validate.href.$dirty,
        }]" style="width: 100%;">
      <input type="text"
             placeholder="Введите ссылку"
             aria-label="Введите ссылку"
             v-model="editLink.href"
             @blur="validate.href.$touch()"
             class="field-standard"/>
    </app-base-field>

    <button @click="updateLink"
            :disabled="validate.$invalid"
            class="btn-standard-icon btn-position">
      <img :src="refreshIcon"
           class="icon-trashcan"
           alt="assets/images/icon/refresh.svg">
    </button>

    <button @click="$emit('deleteLink', link.id)"
            class="btn-warning-icon btn-position">
      <img :src="trashcanIcon"
           alt="assets/images/icon/trashcan.svg">
    </button>

  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import AppSelectImg from '@/components/UI/AppSelectImg.vue';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import { Link } from '@/types/site.types';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import useAlerts from '@/hooks/useAlerts';
import AppBaseField from '@/components/UI/AppBaseField.vue';
import { EditLink } from '@/types/edit.site.types';

export default defineComponent({
  icon: 'AppLinkItem',
  components: {
    AppBaseField,
    AppSelectImg,
  },
  emits: ['deleteLink', 'updateLink'],
  props: {
    link: {
      type: Object as PropType<Link>,
      required: true,
    },
    links: {
      type: Map as PropType<Map<string, string>>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const { alerts } = useAlerts();
    const editLink = ref<EditLink>({
      href: props.link.href,
      icon: props.link.icon,
    });

    const rules = {
      href: {
        required,
        url,
      },
    };

    const updateLink = () => {
      if (props.link.icon !== editLink.value.icon
        || props.link.href !== editLink.value.href) {
        emit('updateLink', editLink.value, props.link.id);
      } else {
        alerts.value.push({
          type: 'warning',
          message: 'Данные не изменены',
        });
      }
    };

    const validate = useVuelidate(rules, editLink.value);

    return {
      validate,
      editLink,
      updateLink,
      trashcanIcon,
      refreshIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;

.item-link-container {
  display: flex;
  flex-flow: row;
  justify-content: space-around;
  gap: 1rem;

  .btn-position {
    align-self: flex-end;
    height: 4rem;
    width: 4rem;
  }

  div:nth-child(1) {
    align-self: flex-end;
  }
}

input:nth-child(1) {
  flex: 3;
}

input:nth-child(2) {
  flex: 1;
}
</style>
