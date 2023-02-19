<template>
  <app-modal-window :is-show="isShow"
                    title="Редактировать информацию о кафедре"
                    @close="$emit('close')"
                    :is-footer="true">

    <div class="begin-edit-container">
      <input type="text"
             placeholder="Введите название кафедры"
             class="field-standard"
             v-model="information.title"
             aria-label="Введите название кафедры"/>

      <input type="text"
             placeholder="Введите девиз кафедры"
             class="field-standard mt-10"
             v-model="information.slogan"
             aria-label="Введите девиз кафедры"/>

      <div class="edit-block mt-10">

        <input type="phone"
               placeholder="Введите телефон кафедры"
               class="field-standard"
               v-model="information.phone"
               aria-label="Введите телефон кафедры"/>

        <input type="email"
               placeholder="Введите почту кафедры"
               class="field-standard"
               v-model="information.email"
               aria-label="Введите почту кафедры"/>

      </div>

      <input type="text"
             placeholder="Введите адрес кафедры"
             class="field-standard mt-10"
             v-model="information.address"
             aria-label="Введите адрес кафедры"/>

      <app-department-link-item v-for="link in information.links" :key="link.id"
                                :link="link.name"
                                :href="link.href"
                                class="mt-10"
                                @deleteLink="removeLink(link.id)"/>

      <div class="edit-block mt-20">
        <input type="button"
               value="ДОБАВИТЬ ССЫЛКУ"
               class="btn-standard"
               @click="addLink"/>
        <input type="button" value="ОБНОВИТЬ" class="btn-standard"/>
      </div>
    </div>

  </app-modal-window>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import AppModalWindow from '@/components/UI/AppModalWindow.vue';
import AppDepartmentLinkItem from '@/components/UI/items/AppDepartmentLinkItem.vue';
import { useStore } from 'vuex';
import { InformationDepartment } from '@/api/model/ModelTypes';

export default defineComponent({
  name: 'TheModalChangeInformationDepartment',
  components: {
    AppModalWindow,
    AppDepartmentLinkItem,
  },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
  },
  emits: ['close'],
  setup() {
    const store = useStore();

    const addLink = () => {
      store.commit('addDepartmentLink', {
        id: Math.random()
          .toString(),
        href: '',
        name: '',
      });
    };

    const removeLink = (id: string) => {
      store.commit('removeLink', id);
    };

    return {
      addLink,
      removeLink,
      information: computed(() => store.getters.getInformationOfDepartment as InformationDepartment),
    };
  },
});
</script>

<style lang="scss" scoped>

.begin-edit-container {
  display: flex;
  flex-flow: column;
  width: 50vw;

  .edit-block {
    display: flex;
    flex-flow: row;
    gap: 10px;

    input {
      flex: 1;
    }
  }
}

</style>
