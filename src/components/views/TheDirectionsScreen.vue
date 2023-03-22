<template>
  <app-base-screen title="Направления">
    <the-modal-change-directions
      :directions="directions"
      :is-show="isShow"
      @close="changeShowModal"/>

    <div class="direction-change mb-20" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             value="редактировать"
             @click="changeShowModal"/>
    </div>
    <div :class="[directions.length === 3? 'gap-5':'gap-1','directions-screen-container']">
      <app-direction-screen-item v-for="(info, index) in directions" :key="info.id"
                                 :index-drawing="index"
                                 :direction-info="info"/>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import TheModalChangeDirections from '@/components/modals/direction/TheModalChangeDirections.vue';
import AppDirectionScreenItem from '@/components/views/items/AppDirectionScreenItem.vue';
import AppBaseScreen from '../UI/AppBaseScreen.vue';

export default defineComponent({
  icon: 'TheDirectionsScreen',
  components: {
    TheModalChangeDirections,
    AppBaseScreen,
    AppDirectionScreenItem,
  },
  setup() {
    const store = useStore();
    const {
      isShow,
      changeShowModal,
    } = useShowModal();

    return {
      isShow,
      directions: computed(() => store.getters['direction/getDirections']),
      isAuth: computed(() => store.getters['auth/isAuth']),
      changeShowModal,
    };
  },
});
</script>

<style lang="scss" scoped>

.directions-screen-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 24%);
  grid-template-rows: 1fr;
  justify-content: center;

  &.gap-1 {
    gap: 1%;
  }

  &.gap-5 {
    gap: 5%;
  }

}

.direction-change {
  display: flex;
  justify-content: center;
}

</style>
