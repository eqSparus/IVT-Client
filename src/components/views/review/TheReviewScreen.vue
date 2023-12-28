<template>
  <app-base-screen type-screen="main">

    <the-modal-edit-review :is-show="isShow"
                           :reviews="reviews"
                           @close="toggleModal"/>

    <div class="edit-review-block" v-if="isAuth">
      <input type="button"
             class="btn-standard"
             value="редактировать"
             @click="toggleModal">
    </div>

    <the-review-carousel v-if="reviews.length !== 0" class="mt-20" :reviews="reviews"/>

  </app-base-screen>
</template>

<script lang="ts">

import { computed, defineComponent } from 'vue';
import AppBaseScreen from '@/components/UI/AppBaseScreen.vue';
import TheReviewCarousel from '@/components/views/review/item/TheReviewCarousel.vue';
import TheModalEditReview from '@/components/views/review/modal/TheModalEditReview.vue';
import useTokenAuthentication from '@/hooks/useTokenAuthentication';
import useShowModal from '@/hooks/useShowModal';
import { useStore } from 'vuex';

export default defineComponent({
  name: 'TheReviewScreen',
  components: {
    TheModalEditReview,
    TheReviewCarousel,
    AppBaseScreen,
  },
  setup() {
    const { isAuth } = useTokenAuthentication();
    const store = useStore();
    const {
      isShow,
      toggleModal,
    } = useShowModal();

    return {
      reviews: computed(() => store.getters['review/getReviews']),
      isShow,
      isAuth,
      toggleModal,
    };
  },
});
</script>

<style lang="scss" scoped>

.edit-review-block {
  margin: 0 auto 2rem auto;
}

</style>
