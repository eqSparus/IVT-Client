import { Module } from 'vuex';
import { ReviewState, RootState } from '@/plugins/store/store.types';
import { Review } from '@/types/site.types';
import { EditReview } from '@/hooks/useEditReview';
import {
  requestCreateReview,
  requestDeleteReview,
  requestUpdateReview,
  requestUpdateReviewImg,
} from '@/http/HttpReviewApi';

const ReviewModule: Module<ReviewState, RootState> = {
  namespaced: true,
  state() {
    return {
      reviews: [] as Array<Review>,
    };
  },
  getters: {
    getReviews(state: ReviewState) {
      return state.reviews;
    },
  },
  mutations: {
    setReviews(state: ReviewState, reviews: Review[]) {
      state.reviews.push(...reviews);
    },
    addReview(state: ReviewState, review: Review) {
      state.reviews.push(review);
    },
    updateReview(state: ReviewState, review: Omit<Review, 'urlImg'>) {
      const indexUpdate = state.reviews.findIndex((r) => r.id === review.id);
      state.reviews[indexUpdate].name = review.name;
      state.reviews[indexUpdate].jobTitle = review.jobTitle;
      state.reviews[indexUpdate].comment = review.comment;
    },
    removeReview(state: ReviewState, id: string) {
      const deleteIndex = state.reviews.findIndex((r) => r.id === id);
      state.reviews.splice(deleteIndex, 1);
    },
    updateImgReview(state: ReviewState, data: {
      path: string,
      id: string
    }) {
      const indexUpdate = state.reviews.findIndex((r) => r.id === data.id);
      state.reviews[indexUpdate].urlImg = `${data.path}?range=${Date.now()}`;
    },
  },
  actions: {
    async add({ commit }, review: {
      dataReview: EditReview,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', review.image, 'review.png');
      formData.append('data', new Blob([JSON.stringify(review.dataReview)], {
        type: 'application/json',
      }));
      const data = await requestCreateReview(formData);
      commit('addReview', data);
    },
    async update({ commit }, review: EditReview) {
      const data = await requestUpdateReview(review);
      commit('updateReview', data);
    },
    async remove({ commit }, id: string) {
      await requestDeleteReview(id);
      commit('removeReview', id);
    },
    async updateImg({ commit }, review: {
      id: string,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', review.image, 'review.png');
      const data = await requestUpdateReviewImg(formData, review.id);
      commit('updateImgReview', {
        path: data.url,
        id: review.id,
      });
    },
  },
};

export default ReviewModule;
