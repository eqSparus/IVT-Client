<template>
  <div class="position-teacher-item">
    <img :src="teacher.urlImg"
         :alt="teacher.urlImg"
         class="position-teacher-item-img"/>

    <div class="fs-24 not-copy">
      <span class="ml-20">{{ teacher.lastName }}</span>
      <span class="ml-10">{{ teacher.firstName }}</span>
      <span class="ml-10">{{ teacher.middleName }}</span>
    </div>

    <input type="number"
           class="ml-20 field-standard input-position"
           aria-label="Позиция преподавателя"
           @blur="changePosition"
           v-model.number="position">
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { Teacher } from '@/types/site.types';
import useEditTeacher from '@/hooks/useEditTeacher';
import useAlerts from '@/hooks/useAlerts';

export default defineComponent({
  name: 'TeacherPositionItem',
  props: {
    teacher: {
      type: Object as PropType<Teacher>,
      required: true,
    },
  },
  setup(props) {
    const { alerts } = useAlerts();
    const position = ref<number>(props.teacher.position);

    const { updatePosition } = useEditTeacher();

    const changePosition = () => {
      if (position.value !== props.teacher.position) {
        if (Number.isInteger(position.value)) {
          updatePosition(position.value, props.teacher.id as string);
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

.position-teacher-item {
  display: grid;
  grid-template-columns: 5rem 2fr 1fr;
  align-items: center;

  .position-teacher-item-img {
    width: 5rem;
    height: 5rem;
  }

  .not-copy {
    user-select: none;
  }

  .input-position {
    text-align: center;
  }
}

</style>
