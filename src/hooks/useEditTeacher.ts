import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { EditTeacher } from '@/types/edit.site.types';

export const MIN_LOAD_TEACHER = 6;

const defaultTeacher = {
  firstName: '',
  lastName: '',
  middleName: '',
  postDepartment: '',
  postTeacher: '',
  postAdditional: '',
};

const useEditTeacher = (customTeacher: EditTeacher = defaultTeacher) => {
  const teacher = ref<EditTeacher>(customTeacher);

  const rules = {
    firstName: {
      required,
    },
    lastName: {
      required,
    },
  };

  const valid = useVuelidate(rules, teacher);

  return {
    teacher,
    valid,
  };
};

export default useEditTeacher;
