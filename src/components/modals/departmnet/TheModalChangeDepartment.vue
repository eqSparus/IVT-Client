<template>
  <app-modal-window :is-show="isShow"
                    :title="titleModal"
                    @close="$emit('close')"
                    :is-footer="true">

    <div class="modal-size">

      <div class="begin-edit-container" v-if="isWindow">
        <the-setting-department
          :department="department"/>

        <input type="button"
               value="изменить ссылки"
               class="btn-standard mt-20"
               @click="isWindow = false"/>
      </div>

      <div class="begin-edit-container" v-else>
        <the-setting-links
          :links="links"/>

        <input type="button"
               value="изменить информацию о кафедре"
               class="btn-standard mt-20"
               @click="isWindow = true"/>

      </div>
    </div>
  </app-modal-window>
</template>

<script lang="ts">
import {
  computed,
  defineComponent, PropType, ref,
} from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import { InformationDepartment, Link } from '@/api/model/ModelTypes';
import TheSettingDepartment from '@/components/modals/departmnet/TheSettingDepartment.vue';
import TheSettingLinks from '@/components/modals/departmnet/TheSettingLinks.vue';

export default defineComponent({
  icon: 'TheModalChangeDepartment',
  components: {
    TheSettingLinks,
    TheSettingDepartment,
    AppModalWindow,
  },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    department: {
      type: Object as PropType<InformationDepartment>,
      required: true,
    },
    links: {
      type: Array as PropType<Array<Link>>,
      required: true,
    },
  },
  emits: ['close'],
  setup() {
    const isWindow = ref<boolean>(true);

    return {
      isWindow,
      titleModal: computed(() => (isWindow.value ? 'Изменение информацию о кафедре'
        : 'Изменение ссылок на сайты')),
    };
  },
});
</script>

<style lang="scss" scoped>

.modal-size {
  width: 50vw;

  .begin-edit-container {
    display: flex;
    flex-flow: column;

    .edit-block {
      display: flex;
      flex-flow: row;
      gap: 10px;

      input {
        flex: 1;
      }
    }
  }
}

</style>
