import { Department } from '@/types/SiteContentTypes';
import { ref } from 'vue';
import { email, required } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import updateDepartment from '@/api/DepartmentApi';
import { useStore } from 'vuex';

const useEditDepartment = (dep: Department) => {
  const store = useStore();
  const department = ref<Department>({
    title: dep.title,
    slogan: dep.slogan,
    email: dep.email,
    phone: dep.phone,
    address: dep.address,
    leaderId: dep.leaderId,
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

  const update = async (success: () => void, fail: () => void) => {
    if (department.value.title !== dep.title
      || department.value.slogan !== dep.slogan
      || department.value.email !== dep.email
      || department.value.phone !== dep.phone
      || department.value.address !== dep.address
      || department.value.leaderId !== dep.leaderId) {
      try {
        const data = await updateDepartment(department.value);
        store.commit('department/setDepartment', data);
        success();
      } catch (e) {
        fail();
      }
    } else {
      fail();
    }
  };

  return {
    department,
    valid,
    update,
  };
};

export default useEditDepartment;
