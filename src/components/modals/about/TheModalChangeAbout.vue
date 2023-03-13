<template>
  <app-modal-window :is-show="isShow"
                    title="Редактировать информацию о кафедре"
                    @close="$emit('close')"
                    :is-footer="true">

    <div class="modal-about-container">

      <div class="item-about" v-for="about in abouts" :key="about.id">
        <app-change-about-item :about="about"
                               @updateAbout="updateAbout"/>
      </div>

    </div>

  </app-modal-window>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import { AboutDepartment } from '@/api/model/ModelTypes';
import putAboutDepartment from '@/api/AboutDepartmentApi';
import { useStore } from 'vuex';
import AppChangeAboutItem from '@/components/modals/about/AppChangeAboutItem.vue';

export default defineComponent({
  icon: 'TheModalChangeAbout',
  components: {
    AppChangeAboutItem,
    AppModalWindow,
  },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    abouts: {
      type: Array as PropType<Array<AboutDepartment>>,
      required: true,
    },
  },
  setup() {
    const store = useStore();

    const updateAbout = async (about: AboutDepartment) => {
      const data = await putAboutDepartment(about);
      store.commit('about/updateAbout', data);
    };

    return {
      updateAbout,
    };
  },
  emits: ['close'],
});
</script>

<style lang="scss" scoped>
.modal-about-container {
  display: flex;
  flex-flow: row;
  gap: 20px;
}

</style>
