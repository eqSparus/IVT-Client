<template>
  <the-modal-edit-partner :is-show="isShow"
                          :partner="partner"
                          @close="toggleModal"/>
  <div class="partner-item-container" title="Перейти на сайт">
    <a :href="partner.href"
       class="partner-link"
       target="_blank">
      <img class="link-logo" :src="partner.urlImg" :alt="partner.urlImg">
    </a>

    <button class="btn-standard-icon ml-10"
            v-if="isAuth"
            @click="toggleModal">
      <img :src="refreshIcon"
           alt="assets/images/icon/refresh.svg">
    </button>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { Partner } from '@/types/site.types';
import refreshIcon from '@/assets/images/icons/refresh.svg';
import TheModalEditPartner from '@/components/views/partner/modal/TheModalEditPartner.vue';
import useShowModal from '@/hooks/useShowModal';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';

export default defineComponent({
  name: 'AppPartnerItem',
  components: { TheModalEditPartner },
  props: {
    partner: {
      type: Object as PropType<Partner>,
      required: true,
    },
  },
  setup() {
    const { isAuth } = useTokenAuthentication();

    const {
      isShow,
      toggleModal,
    } = useShowModal();

    return {
      isShow,
      isAuth,
      toggleModal,
      refreshIcon,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;

.partner-item-container {
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: center;
  flex: 33.333%;

  .partner-link {
    .link-logo {
      width: 30rem;
      height: auto;
    }

    &:focus {
      outline: none;
      border-bottom: 0.2rem solid prop.$primary-color;
    }
  }

  button {
    width: 4rem;
    height: 4rem;
  }
}

</style>
