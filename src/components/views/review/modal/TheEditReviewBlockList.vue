<template>
  <div class="review-list-container">
    <app-edit-review-item class="mt-10" v-for="review in reviews" :key="review.id" :review="review"/>
  </div>
</template>

<script lang="ts">

import { defineComponent, PropType } from 'vue';
import AppEditReviewItem from '@/components/views/review/modal/AppEditReviewItem.vue';
import { Review } from '@/types/site.types';

export default defineComponent({
  name: 'TheEditReviewBlockList',
  components: { AppEditReviewItem },
  props: {
    reviews: {
      type: Array as PropType<Array<Review>>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>

.review-list-container {
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: 50vh;
  padding: 0 1rem;
}

</style>
