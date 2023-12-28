<template>
  <app-modal-window :is-show="isShow"
                    title="Раздел &quotО кафедре&quot"
                    @close="$emit('close')"
                    :is-footer="true">

    <div class="modal-about-edit-container">
      <app-edit-about-item v-for="about in abouts" :key="about.id"
                           :about="about"
                           @update="updateAbout"/>
    </div>
  </app-modal-window>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppModalWindow from '@/components/UI/AppBaseModal.vue';
import { AboutDepartment } from '@/types/site.types';
import { useStore } from 'vuex';
import AppEditAboutItem from '@/components/views/about/modal/AppEditAboutItem.vue';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  icon: 'TheModalEditAbout',
  components: {
    AppEditAboutItem,
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
    const { alerts } = useAlerts();

    const updateAbout = async (about: AboutDepartment, id: string) => {
      try {
        await store.dispatch('about/update', {
          about,
          id,
        });
        alerts.value.push({
          type: 'info',
          message: 'Блок раздела обновлен',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось обновить блок раздела',
        });
      }
    };

    return {
      alerts,
      updateAbout,
    };
  },
  emits: ['close'],
});
</script>

<style lang="scss" scoped>

.modal-about-edit-container {
  display: flex;
  flex-flow: row;
  gap: 2rem;
  min-width: 90rem;
}

</style>
