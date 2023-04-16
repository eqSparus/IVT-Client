<template>
  <div class="item">
    <div class="item-row">
      <textarea class="text-area field-standard"
                placeholder="Введите название раздела"
                aria-label="Введите название пункта"
                @input="$emit('update:name', $event)"
                :value="item.name">
      </textarea>
      <button class="btn-standard-icon icon ml-10"
              @click="isOpen = !isOpen">
        <img :src="arrowIcon"
             :class="{'arrow-transform': isOpen}"
             alt="assets/images/icon/refresh.svg">
      </button>
      <button class="btn-warning-icon icon ml-10"
              @click="$emit('deleteItem')">
        <img :src="trashcanIcon"
             alt="assets/images/icon/trashcan.svg">
      </button>
    </div>

    <div class="item-points" v-if="isOpen">
      <div class="item-row mt-10" v-for="(point, index) in item.points" :key="point">
        <textarea class="text-area field-standard"
                  aria-label="Введите название пункта"
                  placeholder="Введите название пункта"
                  @input="point.point = $event.target.value"
                  :value="point.point">
        </textarea>
        <button class="btn-warning-icon icon ml-10"
                @click="$emit('deletePoint', index)">
          <img :src="trashcanIcon"
               alt="assets/images/icon/trashcan.svg">
        </button>
      </div>

      <app-plus-minus-button class="mt-10" @action="addPoint"/>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType, ref } from 'vue';
import { EntrantItem } from '@/types/SiteContentTypes';
import trashcanIcon from '@/assets/images/icons/trashcan.svg';
import arrowIcon from '@/assets/images/icons/arrow.svg';
import AppPlusMinusButton from '@/components/UI/AppPlusMinusButton.vue';

export default defineComponent({
  name: 'TheModalAddEntrantItem',
  components: { AppPlusMinusButton },
  emits: ['deleteItem', 'update:name', 'addPoint', 'deletePoint'],
  props: {
    item: {
      type: Object as PropType<EntrantItem>,
      required: true,
    },
  },
  setup(props, { emit }) {
    const isOpen = ref<boolean>(false);

    const addPoint = () => {
      emit('addPoint');
    };

    return {
      isOpen,
      addPoint,
      trashcanIcon,
      arrowIcon,
    };
  },
});
</script>

<style lang="scss" scoped>

.item {
  align-items: center;

  .icon {
    width: 4rem;
    height: 4rem;
  }

  .arrow-transform {
    transform: rotate(180deg);
  }

  .item-row {
    display: flex;
    flex-flow: row;
    align-items: center;
  }

  .item-points {
    display: flex;
    flex-flow: column;
    margin-left: 10%;
  }

  textarea {
    flex: 3;
  }
}

</style>
