<template>
  <div class="carousel-slider-container">

    <button class="btn-pointer"
            @click="previousIndex">
      <img :src="pointerLeft" alt="assets/images/icons/pointer-left.svg">
    </button>

    <div class="review-list"
         @touchstart="touchStart"
         @touchmove="touchMove">
      <div v-for="(review, i) in reviews" :key="review.id" :style="{ transform: `translateX(${offsetOrder}%)` }">
        <app-review-item :review="review" :class="{'active-slider': offsetOrder === i * -100 + 100}"/>
      </div>
    </div>

    <button class="btn-pointer"
            @click="nextIndex">
      <img :src="pointerRight" alt="assets/images/icons/pointer-right.svg">
    </button>
  </div>
</template>

<script lang="ts">

import {
  defineComponent,
  PropType,
  ref,
} from 'vue';
import { Review } from '@/types/site.types';
import AppReviewItem from '@/components/views/review/item/AppReviewItem.vue';
import pointerLeft from '@/assets/images/icons/pointer-left.svg';
import pointerRight from '@/assets/images/icons/pointer-right.svg';

export default defineComponent({
  name: 'TheReviewCarousel',
  components: { AppReviewItem },
  props: {
    reviews: {
      type: Array as PropType<Array<Review>>,
      required: true,
    },
  },
  setup(props) {
    let bias = 100;
    let center = 100;

    if (window.devicePixelRatio > 2) {
      bias = 0;
    }

    if (props.reviews.length === 1) {
      center = 0;
    }

    const offsetOrder = ref<number>(bias - center);

    const nextIndex = () => {
      if (offsetOrder.value !== props.reviews.length * -100 + (100 + bias)) {
        offsetOrder.value -= 100;
      } else {
        offsetOrder.value = bias;
      }
    };

    const previousIndex = () => {
      if (offsetOrder.value !== bias) {
        offsetOrder.value += 100;
      } else {
        offsetOrder.value = props.reviews.length * -100 + (100 + bias);
      }
    };

    const touchValueX = ref<number | null>(null);

    const touchStart = (event: TouchEvent) => {
      touchValueX.value = event.touches[0].clientX;
    };

    const touchMove = (event: TouchEvent) => {
      const touchDown = touchValueX.value;

      if (touchDown === null) {
        return;
      }

      const currentTouch = event.touches[0].clientX;
      const diff = touchDown - currentTouch;
      if (diff > 8) {
        nextIndex();
      }

      if (diff < -8) {
        previousIndex();
      }
      touchValueX.value = null;
    };

    return {
      offsetOrder,
      nextIndex,
      previousIndex,
      touchStart,
      touchMove,
      pointerLeft,
      pointerRight,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss';

.carousel-slider-container {
  display: flex;
  flex-flow: row;
  justify-content: space-between;
  column-gap: 5rem;
  width: 100%;

  .review-list {
    display: flex;
    transition: 0.5s ease-in-out transform;
    will-change: auto;
    width: 100%;
    overflow: hidden;
    border-radius: 1rem;

    & > div {
      display: flex;
      justify-content: center;
      width: 33.333%;
      transition: 0.3s ease-in-out;
      flex-shrink: 0;

      @include utils.phone-style {
        width: 100%;
      }

      & > * {
        transform: scale(.9);

        @include utils.phone-style {
          transform: scale(1);
        }
      }

      & > .active-slider {
        transform: scale(1);
      }
    }
  }

  .btn-pointer {
    padding: 0;
    width: 2rem;
    height: 4rem;
    border: none;
    background: none;
    align-self: center;

    img {
      filter: props.$icon-svg-second-additional;
    }

    &:hover {
      filter: props.$icon-svg-hover-color-info;
      cursor: pointer;
    }

    &:disabled {
      filter: props.$icon-svg-hover-color-warning;
      cursor: default;
    }
  }
}

</style>
