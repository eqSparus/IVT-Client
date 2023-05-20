import { ref } from 'vue';
import { Partner } from '@/types/site.types';
import { required, url } from '@vuelidate/validators';
import useVuelidate from '@vuelidate/core';

export type EditPartner = Omit<Partner, 'urlImg'>

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
