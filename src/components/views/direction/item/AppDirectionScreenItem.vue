<template>
  <div class="edit-entrant-item-container">
    <div class="item-drawing">
      <img class="img-drawing" :src="drawings[indexImg]" :alt="drawings[indexImg]"/>
    </div>

    <div class="item-content-container">
      <div class="item-content">

        <h3 class="title fs-26">{{ direction.title }}</h3>

        <span class="additional-block fs-24 mt-20">{{ direction.degree }}</span>

        <span class="additional-block fs-24 mt-10">{{ direction.form }}</span>

        <span class="additional-block fs-24 mt-10">{{ direction.duration + durationText }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Direction } from '@/types/site.types';
import { defineComponent, PropType, computed } from 'vue';
import directionLeft from '@/assets/images/draws/direction-left.svg';
import directionCenter from '@/assets/images/draws/direction-center.svg';
import directionRight from '@/assets/images/draws/direction-right.svg';

export type NumberImg = 0 | 1 | 2 | 3;

export default defineComponent({
  icon: 'AppDirectionScreenItem',
  props: {
    direction: {
      type: Object as PropType<Direction>,
      required: true,
    },
    indexImg: {
      type: Number as PropType<NumberImg>,
      default: 0,
    },
  },
  setup(props) {
    const drawings = [directionLeft, directionCenter, directionRight, directionLeft];

    return {
      drawings,
      durationText: computed(() => (props.direction.duration >= 5 ? ' лет' : ' года')),
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as prop;
@use '@/assets/scss/utils.scss';

.edit-entrant-item-container {
  display: flex;
  border-radius: 0.8rem;
  background: prop.$main-first-extra-color;
  flex-flow: column;
  width: 100%;

  .item-drawing {
    display: flex;
    flex-flow: row;
    justify-content: flex-end;

    .img-drawing {
      height: auto;
      width: 100%;
      border-radius: 0.8rem 0.8rem 0 0;
    }
  }

  .item-content-container {
    height: 100%;
    display: flex;
    flex-flow: row;

    .item-content {
      align-self: flex-end;
      padding: 11% 5%;

      .title {
        @include utils.font-style($weight: 700,
        $color: prop.$main-second-color);
      }

      .additional-block {
        display: block;
        @include utils.font-style($color: prop.$main-second-text-transparent-color);
      }
    }
  }

  @include utils.phone-style {
    flex-flow: row;

    .item-drawing {
      order: 2;

      .img-drawing {
        width: auto;
        height: 120px;
      }
    }

    .item-content-container {
      .item-content {
        align-self: flex-end;
        padding: 5% 8%;
      }
    }
  }
}
</style>
