<template>
  <app-base-screen title="Абитуриенту" :is-second="true">

    <the-modal-change-entrant :is-show="isShow"
                           @close="changeShowModal"/>

    <div class="entrant-screen-container">
      <app-entrant-screen-item :class="[index === 0 ? '' : 'mt-30']" v-for="(entrant, index) in entrants"
                               :key="entrant.id" :entrant="entrant"/>

      <div class="entrant-change mt-20" v-if="isAuth">
        <input type="button"
               class="btn-standard"
               @click="changeShowModal"
               value="Добавить">
      </div>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppEntrantScreenItem from '@/components/views/items/AppEntrantScreenItem.vue';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import TheModalChangeEntrant from '@/components/modals/entrant/TheModalChangeEntrant.vue';
import AppBaseScreen from '../UI/AppBaseScreen.vue';

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
      changeShowModal,
    } = useShowModal();

    return {
      entrants: computed(() => store.getters['entrant/getEntrants']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      isShow,
      changeShowModal,
    };
  },
});
</script>

<style lang="scss" scoped>
.entrant-screen-container {
  display: grid;
  grid-template-columns: 1fr;
  width: 95%;
  margin: 0 auto;

  .entrant-change {
    display: flex;
    justify-content: center;
  }
}
</style>
