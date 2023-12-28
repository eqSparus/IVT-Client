import { ref } from 'vue';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';
import { EditPartner } from '@/types/edit.site.types';

const defaultPartner = {
  href: '',
};

const useEditPartner = (customPartner: EditPartner = defaultPartner) => {
  const partner = ref<EditPartner>(customPartner);

  const rules = {
    href: {
      required,
      url,
    },
  };

  const valid = useVuelidate(rules, partner);

  return {
    partner,
    valid,
  };
};

export default useEditPartner;
