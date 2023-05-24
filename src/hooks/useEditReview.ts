import { Review } from '@/types/site.types';
import { ref } from 'vue';
import useVuelidate from '@vuelidate/core';
import { required } from '@vuelidate/validators';

export type EditReview = Omit<Review, 'urlImg'>;

const defaultReview = {
  name: '',
  jobTitle: '',
  comment: '',
};

const useEditReview = (customReview: EditReview = defaultReview) => {
  const review = ref<EditReview>(customReview);

  const rules = {
    name: {
      required,
    },
    jobTitle: {
      required,
    },
    comment: {
      required,
    },
  };

  const valid = useVuelidate(rules, review);

  return {
    review,
    valid,
  };
};

export default useEditReview;
