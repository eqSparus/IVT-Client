import { ref, toRefs } from 'vue';
import { maxValue, minValue, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { EditDirection } from '@/types/edit.site.types';

const defaultDirection = {
  title: '',
  degree: '',
  form: '',
  duration: 0,
};

const useEditDirection = (customDir: EditDirection = defaultDirection) => {
  const direction = ref<EditDirection>(customDir);

  const rules = {
    title: {
      required,
    },
    degree: {
      required,
    },
    form: {
      required,
    },
    duration: {
      required,
      minValue: minValue(1),
      maxValue: maxValue(10),
    },
  };

  const valid = useVuelidate(rules, toRefs(direction.value));

  return {
    direction,
    valid,
  };
};

export default useEditDirection;
