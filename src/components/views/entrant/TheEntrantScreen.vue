<template>
  <app-base-screen title="Абитуриенту" type-screen="second">

    <the-modal-change-entrant :is-show="isShow"
                              @close="toggleModal"/>

    <div class="entrant-screen-container">
      <div class="entrant-change mt-20" v-if="isAuth">
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
import AppBaseScreen from '../../UI/AppBaseScreen.vue';

export default defineComponent({
  icon: 'TheEntrantScreen',
  components: {
    TheModalChangeEntrant,
    AppBaseScreen,
    AppEntrantScreenItem,
  },
  setup() {
    const store = useStore();
    const {
      isShow,
      toggleModal,
    } = useShowModal();

    return {
      isShow,
      entrants: computed(() => store.getters['entrant/getEntrants']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      toggleModal,
    };
  },
});
</script>

<style lang="scss" scoped>

.entrant-screen-container {
  display: grid;
  grid-template-columns: 1fr;
  margin: 0 auto;

  @media only screen and (min-width: 1000px) {
    width: 95%;
  }

  .entrant-change {
    display: flex;
    justify-content: center;
  }
}
</style>
