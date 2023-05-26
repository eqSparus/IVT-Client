<template>
  <app-base-screen title="Абитуриенту" type-screen="second">

    <the-modal-change-entrant :is-show="isShow"
                              @close="toggleModal"/>

    <div class="entrant-screen-container">
      <div class="entrant-edit-block" v-if="isAuth">
        <input type="button"
               class="btn-standard"
               @click="toggleModal"
               value="добавить">
      </div>
      <app-entrant-screen-item :class="[index === 0 ? '' : 'mt-30']" v-for="(entrant, index) in entrants"
                               :key="entrant.id" :entrant="entrant"/>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppEntrantScreenItem from '@/components/views/entrant/item/AppEntrantScreenItem.vue';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import TheModalChangeEntrant from '@/components/views/entrant/modal/TheModalEditEntrant.vue';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';
import AppBaseScreen from '../../UI/AppBaseScreen.vue';

export default defineComponent({
  icon: 'TheEntrantScreen',
  components: {
    TheModalChangeEntrant,
    AppBaseScreen,
    AppEntrantScreenItem,
  },
  setup() {
    const { isAuth } = useTokenAuthentication();
    const store = useStore();
    const {
      isShow,
      toggleModal,
    } = useShowModal();

    return {
      isShow,
      entrants: computed(() => store.getters['entrant/getEntrants']),
      isAuth,
      toggleModal,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/utils.scss';

.entrant-screen-container {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;

  @include utils.phone-style {
    width: 95%;
  }

  .entrant-edit-block {
    margin: 0 auto 2rem auto;
  }
}
</style>
