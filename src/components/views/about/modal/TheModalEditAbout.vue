<template>
  <app-modal-window :is-show="isShow"
                    title="Редактировать информацию о кафедре"
                    @close="$emit('close')"
                    :is-footer="true">

    <app-list-alert :time="3000"
                    :alerts="alerts"
                    @deleteAlert="alerts.splice(0, 1)"/>

    <div class="modal-about-container">

      <div class="item-about" v-for="about in abouts" :key="about.id">
        <app-edit-about-block :about="about"
                               @update="updateAbout"/>
      </div>

    </div>

  </app-modal-window>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import AppModalWindow from '@/components/UI/AppBaseModal.vue';
import { AboutDepartment } from '@/types/SiteContentTypes';
import requestUpdateAboutDepartment from '@/api/AboutDepartmentApi';
import { useStore } from 'vuex';
import AppEditAboutBlock from '@/components/views/about/modal/AppEditAboutBlock.vue';
import AppListAlert, { AlertMessage } from '@/components/UI/AppListAlert.vue';

export default defineComponent({
  icon: 'TheModalEditAbout',
  components: {
    AppListAlert,
    AppEditAboutBlock,
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
    const alerts = ref<Array<AlertMessage>>([]);

    const updateAbout = async (about: AboutDepartment) => {
      try {
        const data = await requestUpdateAboutDepartment(about);
        store.commit('about/updateAbout', data);
        alerts.value.push({
          type: 'info',
          message: 'Данные успешно обновлены',
        });
      } catch (e) {
        alerts.value.push({
          type: 'warning',
          message: 'Не удалось обновить данные',
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
.modal-about-container {
  display: flex;
  flex-flow: row;
  gap: 20px;
}

</style>
