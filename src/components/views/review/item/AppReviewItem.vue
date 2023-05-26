<template>
  <div class="review-item">

    <img :src="quotationMarks"
         alt="assets/images/draws/quotation_marks.svg"
         class="quotation-marks">

    <div class="review-content">

      <img :src="review.urlImg"
           :alt="review.urlImg"
           class="review-image">

      <span class="name-text fs-22 mt-10">{{ review.name }}</span>

      <span class="job-text fs-14">{{ review.jobTitle }}</span>

      <div class="comment-content-scroll mt-20">
        <div class="comment-text fs-18">{{ review.comment }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import { Review } from '@/types/site.types';
import quotationMarks from '@/assets/images/draws/quotation_marks.svg';

export default defineComponent({
  name: 'AppReviewItem',
  props: {
    review: {
      type: Object as PropType<Review>,
      required: true,
    },
  },
  setup() {
    return {
      quotationMarks,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/properties.scss' as props;
@use '@/assets/scss/utils.scss';

.review-item {
  background: props.$main-second-color;
  border-radius: 1rem;
  width: 46.2rem;
  height: 52rem;
  position: relative;
  padding: 3.5rem 5rem 2rem 5rem;

  @include utils.phone-style {
    padding: 3.5rem 2rem 2rem 2rem;
  }

  .quotation-marks {
    position: absolute;
    width: 17rem;
    height: 16rem;
    top: 0;
    left: 0;
  }

  .review-content {
    display: flex;
    flex-flow: column;

    .review-image {
      z-index: 99;
      width: 9.2rem;
      height: 9.2rem;
      border-radius: 50%;
      align-self: center;
    }

    .name-text {
      z-index: 99;
      text-align: center;
      user-select: none;
      @include utils.font-style($color: props.$main-first-color, $weight: 500);

      @include utils.phone-style {
        font-size: 14px;
      }
    }

    .job-text {
      z-index: 99;
      text-align: center;
      user-select: none;
      @include utils.font-style($color: props.$main-first-color);

      @include utils.phone-style {
        font-size: 12px;
      }
    }

    .comment-content-scroll {

      .comment-text {
        word-wrap: break-word;
        text-align: justify;
        user-select: none;
        @include utils.font-style($color: props.$main-first-color);

        @include utils.phone-style {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
