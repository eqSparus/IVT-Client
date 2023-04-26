<template>
  <app-base-modal :is-show="isShow"
                  :title="modalTitle"
                  @close="closeModal"
                  :is-footer="true">

    <div class="begin-edit-container">
      <the-edit-department v-if="isWindow" :department="department"/>
      <the-edit-links v-else :links="links"/>

      <input type="button"
             :value="btnText"
             class="btn-standard mt-20"
             @click="isWindow = !isWindow"/>
    </div>
  </app-base-modal>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  PropType,
  ref,
} from 'vue';
import AppBaseModal from '@/components/UI/AppBaseModal.vue';
import { Department, Link } from '@/types/site.types';
import TheEditDepartment from '@/components/views/primary/modal/TheEditDepartment.vue';
import TheEditLinks from '@/components/views/primary/modal/TheEditLinks.vue';

export default defineComponent({
  icon: 'TheModalEditDepartment',
  components: {
    TheEditLinks,
    TheEditDepartment,
    AppBaseModal,
  },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    department: {
      type: Object as PropType<Department>,
      required: true,
    },
    links: {
      type: Array as PropType<Array<Link>>,
      required: true,
    },
  },
  emits: ['close'],
  setup(props, { emit }) {
    const isWindow = ref<boolean>(true);

    const closeModal = () => {
      isWindow.value = true;
      emit('close');
    };

    return {
      isWindow,
      btnText: computed(() => (isWindow.value ? 'изменить ссылки' : 'изменить информацию о кафедре')),
      modalTitle: computed(() => (isWindow.value ? 'Информация о кафедре' : 'Ссылки на сайты кафедры')),
      closeModal,
    };
  },
});
</script>

<style lang="scss" scoped>

.begin-edit-container {
  display: flex;
  flex-flow: column;
  width: 90rem;

  .edit-block {
    display: flex;
    flex-flow: row;
    gap: 1rem;

    input {
      flex: 1;
    }
  }
}

</style>
