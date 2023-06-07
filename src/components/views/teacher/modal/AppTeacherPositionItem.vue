<template>
  <tr>
    <td class="img-cell">
      <img :src="teacher.urlImg"
           :alt="teacher.urlImg"
           class="position-teacher-item-img"/>
    </td>

    <td>
      <div class="not-copy">
        <span class="ml-20 fs-24">{{ teacher.lastName }}</span>
        <span class="ml-10 fs-24">{{ teacher.firstName }}</span>
        <span class="ml-10 fs-24">{{ teacher.middleName }}</span>
      </div>
    </td>

    <td class="edit-position-cell">
      <input type="number"
             class="ml-20 field-standard input-position"
             aria-label="Позиция преподавателя"
             @blur="changePosition"
             v-model.number="position">
    </td>
  </tr>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { Teacher } from '@/types/site.types';
import useAlerts from '@/hooks/useAlerts';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'AppTeacherPositionItem',
  props: {
    teacher: {
      type: Object as PropType<Teacher>,
      required: true,
    },
  },
  setup(props) {
    const store = useStore();
    const { alerts } = useAlerts();
    const position = ref<number>(props.teacher.position);

    const changePosition = async () => {
      if (position.value !== props.teacher.position) {
        if (Number.isInteger(position.value)) {
          await store.dispatch('teacher/updatePosition', {
            id: props.teacher.id,
            position: position.value,
          });
        } else {
          position.value = props.teacher.position;
          alerts.value.push({
            type: 'warning',
            message: 'Поле должно быть заполнено целым числом',
          });
        }
      }
    };

    return {
      position,
      changePosition,
    };
  },
});
</script>

<style lang="scss" scoped>

.img-cell {
  width: 5rem;

  .position-teacher-item-img {
    width: 100%;
    height: auto;
  }
}

.not-copy {
  display: flex;
  flex-flow: row;
  user-select: none;
}

.edit-position-cell {
  width: 10rem;

  .input-position {
    width: 100%;
    text-align: center;
    float: right;
  }
}

</style>
