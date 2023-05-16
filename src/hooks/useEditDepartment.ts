import { Department } from '@/types/site.types';
import { ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

const useEditDepartment = (dep: Department) => {
  const department = ref<Department>({
    title: dep.title,
    slogan: dep.slogan,
    email: dep.email,
    phone: dep.phone,
    address: dep.address,
  });

  const rules = {
    title: {
      required,
    },
    slogan: {
      required,
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
    },
    address: {
      required,
    },
  };
  const valid = useVuelidate(rules, department.value);

  return {
    department,
    valid,
  };
};

export default useEditDepartment;
