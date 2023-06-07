<template>
  <app-base-modal title="Раздел &quotОтзывы&quot"
                  :is-show="isShow"
                  :is-footer="true"
                  @close="close">

    <div class="review-edit-container">
      <input type="button"
             :value="textToggleBtn"
             @click="toggleBlock"
             class="btn-standard mb-20">
      <the-edit-review-block-list v-if="isToggle"
                                  :reviews="reviews"/>
      <the-add-review-block v-else/>
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
import TheAddReviewBlock from '@/components/views/review/modal/TheAddReviewBlock.vue';
import TheEditReviewBlockList from '@/components/views/review/modal/TheEditReviewBlockList.vue';
import { Review } from '@/types/site.types';

export default defineComponent({
  name: 'TheModalEditReview',
  emits: ['close'],
  components: {
    TheEditReviewBlockList,
    TheAddReviewBlock,
    AppBaseModal,
  },
  props: {
    isShow: {
      type: Boolean,
      required: true,
    },
    reviews: {
      type: Array as PropType<Array<Review>>,
      required: true,
    },
  },
  setup(props, context) {
    const isToggle = ref<boolean>(true);

    const toggleBlock = () => {
      isToggle.value = !isToggle.value;
    };

    const close = () => {
      isToggle.value = true;
      context.emit('close');
    };

    return {
      isToggle,
      textToggleBtn: computed(() => (isToggle.value ? 'добавить отзыв' : 'список отзывов')),
      toggleBlock,
      close,
    };
  },
});
</script>

<style lang="scss" scoped>

.review-edit-container {
  display: flex;
  flex-flow: column;
  width: 60vw;
}

</style>
