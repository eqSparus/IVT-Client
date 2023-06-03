<template>
  <app-base-screen title="Направления">
    <the-modal-edit-directions :directions="directions"
                               :is-show="isShow"
                               @close="toggleModal"/>

    <div class="screen-edit-block" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             value="редактировать"
             @click="toggleModal"/>
    </div>
    <div :class="[directions.length === 3? 'gap-5':'gap-1','directions-screen-container']">
      <app-direction-screen-item v-for="(info, index) in directions" :key="info.id"
                                 :index-img="Number(index)"
                                 :direction="info"/>
    </div>
  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import { useStore } from 'vuex';
import useShowModal from '@/hooks/useShowModal';
import TheModalEditDirections from '@/components/views/direction/modal/TheModalEditDirections.vue';
import AppDirectionScreenItem from '@/components/views/direction/item/AppDirectionScreenItem.vue';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';
import AppBaseScreen from '../../UI/AppBaseScreen.vue';

export default defineComponent({
  icon: 'TheDirectionsScreen',
  components: {
    TheModalEditDirections,
    AppBaseScreen,
    AppDirectionScreenItem,
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
      directions: computed(() => store.getters['direction/getDirections']),
      isAuth,
      toggleModal,
    };
  },
});
</script>

<style lang="scss" scoped>

.directions-screen-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  justify-items: center;

  &.gap-1 {
    gap: 1%;
  }

  &.gap-5 {
    gap: 5%;
  }

}

.screen-edit-block {
  margin: 0 auto 2rem auto;
}

</style>
