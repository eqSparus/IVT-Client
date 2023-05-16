import { Teacher } from '@/types/site.types';
import { ref } from 'vue';
import { required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export type EditTeacher = Omit<Teacher, 'position' | 'urlImg'>
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
