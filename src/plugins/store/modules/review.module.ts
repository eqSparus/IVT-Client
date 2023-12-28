import { Module } from 'vuex';
import { ReviewState, RootState } from '@/plugins/store/store.types';
import { Review } from '@/types/site.types';
import {
  requestCreateReview,
  requestDeleteReview,
  requestUpdateReview,
  requestUpdateReviewImg,
} from '@/http/HttpReviewApi';
import { EditReview } from '@/types/edit.site.types';

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
    updateReview(state: ReviewState, review: Review) {
      const indexUpdate = state.reviews.findIndex((r) => r.id === review.id);
      state.reviews[indexUpdate] = review;
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
    async update({ commit }, args: {
      review: EditReview,
      id: string,
    }) {
      const data = await requestUpdateReview(args.review, args.id);
      commit('updateReview', data);
    },
    async remove({ commit }, id: string) {
      await requestDeleteReview(id);
      commit('removeReview', id);
    },
    async updateImg({ commit }, args: {
      id: string,
      image: Blob,
    }) {
      const formData = new FormData();
      formData.append('img', args.image, 'review.png');
      const data = await requestUpdateReviewImg(formData, args.id);
      commit('updateImgReview', {
        path: data.url,
        id: args.id,
      });
    },
  },
};

export default ReviewModule;
